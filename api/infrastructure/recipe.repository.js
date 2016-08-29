import { db } from './seedwork/db';
import { runInTransaction } from './seedwork/baseRepository';
import { getById as getCategoryById } from './category.repository';
import { appTypes } from '../common/appTypes';
import _ from 'lodash';

const getAll = async () => {
    let results = await db.from('recipe')
        .join('category', 'recipe.categoryid', 'category.id')
        .leftJoin('comment', 'recipe.id', 'comment.recipeid')
        .select('recipe.*', 'category.name as category', db.raw('sum(case when comment.id IS NULL then 0 else 1 end) as nrocomments'))
        .groupBy('recipe.id', 'category.id')
        .orderBy('recipe.id')
        .catch((err) => { throw err; });

    return results;
};

const getById = async (id) => {
    let recipe = db.from('recipe')
        .where({ id: id })
        .first();

    let ingredients = db.from('ingredient')
        .where({ recipeid: id })
        .select('id', 'name', 'amount');

    // let comments = db.from('comment')
    //     .where({ recipeid: id })
    //     .select('id', 'content')

    let result = await Promise.all([recipe, ingredients]);
    let query = result[0];
    if(!query) return undefined;

    query.ingredients = result[1] || [];
    //query.commentlist = result[2] || [];

    return query;
};

const getBySlug = async (slug) => {
    let recipe = await db.from('recipe')
        .join('category', 'recipe.categoryid', 'category.id')
        .whereRaw('lower(recipe.slug) = ?', slug.toLowerCase())
        .first('recipe.*', 'category.name as category')
        .catch((err) => { throw err;});
    
    if(recipe) {
        const recipeId = recipe.id;
        let ingredients = db.from('ingredient')
            .where({ recipeid: recipeId })
            .select('id', 'name', 'amount');
            

        let comments = db.from('comment')
            .where({ recipeid: recipeId })
            .select('id', 'content');
        
        let result = await Promise.all([ingredients, comments]);
        recipe.ingredients = result[0] || [];
        recipe.commentlist = result[1] || [];
    }

    return recipe;
};

const addRecipe = async (recipe) => {
    return runInTransaction(async (trx) => {
        
        let ingredientList = recipe.ingredients;
        delete recipe.ingredients;

        const id = await trx.insert(recipe, "id").into('recipe');

        let ingredients = _.map(ingredientList, (ingredient) => {
            return {
                name: ingredient.name,
                amount: ingredient.amount,
                recipeid: id[0]
            }
        }); 

        await trx.insert(ingredients).into('ingredient');

        recipe.id = id[0];
        recipe.nrocomments = 0;
        let category = await getCategoryById(+recipe.categoryid);
        recipe.category = category.name;

        return recipe;
    });
};

const updateRecipe = async (id, recipe) => {
    return runInTransaction(async (trx) => {
        
        let ingredientList = recipe.ingredients;
        delete recipe.ingredients;

        await trx('recipe')
            .where({id: id})
            .update(recipe);

        for(let i = 0; i < ingredientList.length; i++) {
            const ingredient = ingredientList[i];
            const trackState = parseInt(ingredient.entityState || 0);
            let record = {
                name: ingredient.name,
                amount: ingredient.amount,
                recipeid: id
            };
            switch (trackState) {
                case appTypes.trackState.added: {
                    await trx.insert(record).into('ingredient');
                    break;
                }
                case appTypes.trackState.modified: {
                    await trx('ingredient').where({id: ingredient.id}).update(record);
                    break;
                }
                case appTypes.trackState.deleted:{
                    await trx.from('ingredient').where({id: ingredient.id}).del();
                    break;
                }
                default:
                    break;
            }
        }

        return recipe;
    });
};

const deleteRecipe = async (id) => {
    return runInTransaction(async (trx) => {

        await trx.from('ingredient')
            .where({recipeid: id})
            .del();

        await trx.from('comment')
            .where({recipeid: id})
            .del(); 

       let result = await trx.from('recipe')
            .where({id: id})
            .del();

        return result;
    });
};

const existsRecipe = async (recipeId, name) => {
    let results = await db
        .from('recipe')
        .whereRaw('(id = 0 or id <> ?) and lower(name) = ?', [recipeId, name.toLowerCase()])
        .select(1)
        .first();
    
    return !!results;
};

const rateRecipe = async (recipeId, rating) => {
    let recipe = await db.from('recipe').where({id: recipeId}).first();
    if(recipe) {
        let raters = recipe.raters;
        
        let starts = ((+recipe.rating * raters) + (rating)) / (raters + 1);
        starts = starts.toFixed(2);
        let ratedRecord = {
                raters: raters + 1,
                rating: starts
            };
        
        await db('recipe')
            .where({id: recipeId})
            .update(ratedRecord);
        
        recipe.raters = ratedRecord.raters;
        recipe.rating = ratedRecord.rating;
    }
    return recipe;
};

const addComment = async (comment) => {
    const id = await db
        .insert(comment, "id")
        .into('comment')
        .catch((err) => { throw err; });
    
    comment.id = id;

    return comment;
};

const deleteComment = async (recipeId, commentId) => {

    const deletedItems = await db.from('comment')
        .where({id: commentId, recipeid: recipeId})
        .del()
        .catch((err) => { throw err; });

    return deletedItems;
};

export {
    getAll,
    getById,
    getBySlug,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    existsRecipe,
    rateRecipe,
    addComment,
    deleteComment
};
