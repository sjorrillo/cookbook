import * as types from './actionTypes';
import { appConfig } from '../common/appConfig';
import recipeApi from '../api/mockRecipeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import superagent from 'superagent';

export function loadRecipesSuccess(recipes) {
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function getRecipeSuccess(recipe) {
    return { type: types.GET_RECIPE_SUCCESS, recipe };
}

export function createRecipeSuccess(recipe) {
    return { type: types.CREATE_RECIPE_SUCCESS, recipe };
}

export function deleteRecipeSuccess(id) {
    return { type: types.DELETE_RECIPE_SUCCESS, id };
}

export function updateRecipeSuccess(recipe) {
    return { type: types.UPDATE_RECIPE_SUCCESS, recipe };
}

export function loadRecipes() {
    return (dispatch)  => {
        dispatch(beginAjaxCall());
        superagent
            .get(`${appConfig.apiUrl}/recipes`)
            .end((err, res) => {
                if (err) {
                     throw((res && res.body) || err);
                } else {
                    dispatch(loadRecipesSuccess(res.body));
                }
            });
    };
}

export function getRecipeBySlug(slug) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        superagent
            .get(`${appConfig.apiUrl}/recipes/details/${slug}`)
            .end((err, res) => {
                if (err) {
                     throw((res && res.body) || err);
                } else {
                    dispatch(getRecipeSuccess(res.body));
                }
            });
    };
}

export function getRecipeById(id) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        superagent
            .get(`${appConfig.apiUrl}/recipes/${id}`)
            .end((err, res) => {
                if (err) {
                     throw((res && res.body) || err);
                } else {
                    dispatch(getRecipeSuccess(res.body));
                }
            });
    };
}


export function deleteRecipe(id) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return new Promise((resolve, reject) => {
            superagent
                .del(`${appConfig.apiUrl}/recipes/${id}`)
                .end((err, res) => {
                    if (err) {
                        reject((res && res.body) || err);
                        throw((res && res.body) || err);
                    } else {
                        dispatch(deleteRecipeSuccess(id));
                        resolve(id);
                    }
                });
        });
    };
}

export function rateRecipe(ratedRecipe) {
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            superagent
                .patch(`${appConfig.apiUrl}/recipes/${ratedRecipe.id}`)
                .set('Content-Type', 'application/json')
                .send(ratedRecipe)
                .end((err, res) => {
                    if (err) {
                        reject((res && res.body) || err);
                        throw((res && res.body) || err);
                    } else {
                        dispatch(updateRecipeSuccess(res.body.data));
                        resolve(res.body.data);
                    }
                });
        });
    };
}

export function saveRecipe(recipe) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());
        return new Promise((resolve, reject) => {
            if(recipe.id) {
                 superagent
                    .put(`${appConfig.apiUrl}/recipes/${recipe.id}`)
                    .set('Content-Type', 'application/json')
                    .send(recipe)
                    .end((err, res) => {
                        if (err) {
                            reject((res && res.body) || err);
                            throw((res && res.body) || err);
                        } else {
                            dispatch(updateRecipeSuccess(res.body.data));
                            resolve(res.body.data);
                        }
                    });
            }
            else {
                superagent
                    .post(`${appConfig.apiUrl}/recipes`)
                    .set('Content-Type', 'application/json')
                    .send(recipe)
                    .end((err, res) => {
                        if (err) {
                            reject((res && res.body) || err);
                            throw((res && res.body) || err);
                        } else {
                            dispatch(createRecipeSuccess(res.body.data));
                            resolve(res.body.data);
                        }
                    });
            }
        });
    };
}