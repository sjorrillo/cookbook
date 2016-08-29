import * as recipeRepositoy from '../infrastructure/recipe.repository';
import * as utils from '../common/utils';
import { appTypes } from '../common/appTypes';
import _ from 'lodash';

export const recipe = (session) => {

    const getAll = async (req, res) => {
        try {
            let recipes = await recipeRepositoy.getAll();
            res.json(recipes);
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);          
        }
    };

    const getById = async (req, res) => {
        const recipeId = req.params.id;
        try {
            let recipe = await recipeRepositoy.getById(recipeId);
            if(!recipe) {
                let message = utils.messageResponse(appTypes.statusMessage.failure, 'Not found');
                res.status(404).json(message);
            }
            res.json(recipe);
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);          
        }
    };

    const getBySlug = async (req, res) => {
        const slug = req.params.slug;
        try {
            let recipe = await recipeRepositoy.getBySlug(slug);
             if(!recipe) {
                let message = utils.messageResponse(appTypes.statusMessage.failure, 'Not found');
                res.status(404).json(message);
            }
            res.json(recipe);
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);          
        }
    };

    const addRecipe = async (req, res) => {
        const payload = req.body;
        try {
            let exists = await recipeRepositoy.existsRecipe(0, payload.name);
            if(exists) {
                let message = utils.messageResponse(appTypes.statusMessage.failure, "The recipe's name exists in the database");
                res.status(400).json(message)
            }

            let recipe = {
                    ...payload,
                    slug: utils.slugify(payload.name)
                };
            
            delete recipe.id;
            delete recipe.commentlist;

            let result = await recipeRepositoy.addRecipe(recipe);
           
            let message = utils.messageResponse(appTypes.statusMessage.success, result);
            res.status(201).json(message); 
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);  
        }
    };

    const updateRecipe = async (req, res) => {
        const recipeId = req.params.id;
        const payload = req.body;
        try {
            let recipe = {
                name: payload.name,
                slug: utils.slugify(payload.name),
                chef: payload.chef,
                preparation: payload.preparation,
                raters: +payload.raters,
                rating: +payload.rating,
                categoryid: +payload.categoryid,
                ingredients: payload.ingredients
            };

            let result = await recipeRepositoy.updateRecipe(recipeId, recipe);
           
            let message = utils.messageResponse(appTypes.statusMessage.success, result);
            res.json(message); 
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);  
        }
    };

    const deleteRecipe = async (req, res) => {
        const recipeId = req.params.id;
        try {
            let result = await recipeRepositoy.deleteRecipe(recipeId);
            let message = utils.messageResponse(appTypes.statusMessage.success, result);
            res.status(204).json(message);
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);          
        }
    };

    const rateRecipe = async (req, res) => {
        const recipeId = req.params.id;
        const payload = req.body;
        try {
            let result = await recipeRepositoy.rateRecipe(recipeId, payload.rating);
            let message = utils.messageResponse(appTypes.statusMessage.success, result);
            res.json(message); 
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);  
        }
    };

    const addComment = async (req, res) => {
        const recipeId = req.params.id;
        const payload = req.body;
        try {
            let comment = {
                recipeid: recipeId,
                content: payload.content
            };

            let result = await recipeRepositoy.addComment(comment);
           
            let message = utils.messageResponse(appTypes.statusMessage.success, result);
            res.status(201).json(message); 
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);  
        }
    };

    const deleteComment = async (req, res) => {
        const recipeId = req.params.id;
        const payload = req.body;
        try {
            let result = await recipeRepositoy.deleteComment(recipeId, payload.id);
            let message = utils.messageResponse(appTypes.statusMessage.success, result);
            res.status(204).json(message);
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);          
        }
    };

    return {
        getAll,
        getById,
        getBySlug,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        rateRecipe,
        addComment,
        deleteComment
    };
};