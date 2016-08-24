import * as utils from '../common/utils'
import _ from 'lodash';

export const recipe = (db) => {

    const list = async (req, res) => {
        let query = await db.from('recipe')
            .join('category', 'recipe.categoryid', 'category.id')
            .leftJoin('comment', 'recipe.id', 'comment.recipeid')
            .select('recipe.*', 'category.name as category', db.raw('count(*) as nrocomments'))
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
            

        let comments = db.from('comment')
            .where({ recipeid: recipeId })
            .select('id', 'content')

        let result = await Promise.all([recipe, ingredients, comments])
        let query = result[0];
        query.ingredients = result[1] || [];
        //query.comments = result[2] || [];

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
            //recipe.comments = result[1] || [];
        }

        res.json(recipe);
    };

    const addRecive = async (req, res) => {
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

    const deleteRecive = async (req, res) => {
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

    return {
        list,
        getById,
        getBySlug,
        addRecive,
        deleteRecive
    };
};