import * as utils from '../common/utils'
import _ from 'lodash';

export const recipe = (db) => {

    const list = async (req, res) => {
        let query = await db.from('recipe')
            .join('category', 'recipe.categoryid', 'category.id')
            .leftJoin('comment', 'recipe.id', 'comment.recipeid')
            .select('recipe.*', 'category.name as category', db.raw('sum(case when comment.id IS NULL then 0 else 1 end) as nrocomments'))
            .groupBy('recipe.id', 'category.id')
            .orderBy('recipe.id');

        res.json(query);
    };

    const getById = async (req, res) => {
        const recipeId = req.params.id;
        let recipe = db.from('recipe')
            .where({ id: recipeId })
            .first();

        let ingredients = db.from('ingredient')
            .where({ recipeid: recipeId })
            .select('id', 'name', 'amount');
        // let comments = db.from('comment')
        //     .where({ recipeid: recipeId })
        //     .select('id', 'content')

        let result = await Promise.all([recipe, ingredients])
        let query = result[0];
        query.ingredients = result[1] || [];
        //query.commentlist = result[2] || [];

        res.json(query);
    };

    const getBySlug = async (req, res) => {
        const recipeSlug = req.params.slug;
        let recipe = await db.from('recipe')
            .join('category', 'recipe.categoryid', 'category.id')
            .whereRaw('lower(recipe.slug) = ?', recipeSlug.toLowerCase())
            .first('recipe.*', 'category.name as category');
        
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

        res.json(recipe);
    };

    const addRecipe = async (req, res) => {
        const payload = req.body;
        db.transaction(async (trx) => {
            try {
                let recipe = {
                        name: payload.name,
                        slug: utils.slugify(payload.name),
                        chef: payload.chef,
                        preparation: payload.preparation,
                        raters:0,
                        rating:0,
                        categoryid: payload.categoryid
                    };

                const id = await trx.insert(recipe, "id").into('recipe');

                let ingredients = _.map(payload.ingredients, (ingredient) => {
                    return {
                        name: ingredient.name,
                        amount: ingredient.amount,
                        recipeid: id[0]
                    }
                }); 

                await trx.insert(ingredients).into('ingredient');

                await trx.commit();
                
                recipe.id = id[0];
                recipe.nrocomments = 0;
                let category = await db('category').where({id: +recipe.categoryid}).first('name');
                recipe.category = category.name;

                res.json({
                    message: 'success',
                    data: recipe
                });
            } catch(error) {
                await trx.rollback();
                res.json({message: error});
            }
        });
    };

    const updateRecipe = async (req, res) => {
        const recipeId = req.params.id;
        const payload = req.body;
        db.transaction(async (trx) => {
            try {
                let recipe = {
                        name: payload.name,
                        slug: utils.slugify(payload.name),
                        chef: payload.chef,
                        preparation: payload.preparation,
                        raters: +payload.raters,
                        rating: +payload.rating,
                        categoryid: +payload.categoryid
                    };

                await trx('recipe')
                    .where({id: recipeId})
                    .update(recipe);

                for(let i = 0; i < payload.ingredients.length; i++) {
                    const ingredient = payload.ingredients[i];
                    // none: 0, added: 1, modified: 2, deleted: 3, unchanged: 4
                    const trackState = parseInt(ingredient.entityState || 0);
                    switch (trackState) {
                        case 1: {
                            let record = {
                                    name: ingredient.name,
                                    amount: ingredient.amount,
                                    recipeid: recipeId
                                };
                            await trx.insert(record).into('ingredient');
                            break;
                        }
                        case 2: {
                            let record = {
                                    name: ingredient.name,
                                    amount: ingredient.amount,
                                    recipeid: recipeId
                                };
                            await trx('ingredient').where({id: ingredient.id}).update(record);
                            break;
                        }
                        case 3:{
                            await trx.from('ingredient').where({id: ingredient.id}).del();
                            break;
                        }
                        default:
                            break;
                    }
                }

                await trx.commit();
                
                res.json({
                    message: 'success',
                    data: recipe
                });
            } catch(error) {
                await trx.rollback();
                res.json({message: error});
            }
        });
    };

    const deleteRecipe = async (req, res) => {
        const recipeId = req.params.id;
        db.transaction(async (trx) => {
            try {

                await trx.from('ingredient')
                    .where({recipeid: recipeId})
                    .del();

                await trx.from('recipe')
                    .where({id: recipeId})
                    .del(); 

                await trx.commit();

                res.json({
                    message: 'success'
                });
            } catch(error) {
                await trx.rollback();
                res.json({message: error});
            }
        });
    };

    const rateRecipe = async (req, res) => {
        const recipeId = req.params.id;
        const payload = req.body;
        try {
            let recipe = await db.from('recipe').where({id: +recipeId}).first();
            if(payload.rating) {
                let raters = recipe.raters;
               
                let starts = ((+recipe.rating * raters) + (+payload.rating)) / (raters + 1);
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
            res.json({
                message: 'success',
                data: recipe
            });
        } catch(error) {
            res.json({message: error});
        }
    };

    return {
        list,
        getById,
        getBySlug,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        rateRecipe
    };
};