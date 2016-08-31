import * as types from './actionTypes';
import { appConfig } from '../common/appConfig';
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
                if (err || res.statusCode == 500) {
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
                if (err || res.statusCode == 500) {
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
                    if (err || res.statusCode == 500) {
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

export function saveRecipe(recipe) {
    return function(dispatch, getState) {
        //dispatch(beginAjaxCall());
        return new Promise((resolve, reject) => {
            if(recipe.id) {
                 superagent
                    .put(`${appConfig.apiUrl}/recipes/${recipe.id}`)
                    .set('Content-Type', 'application/json')
                    .send(recipe)
                    .end((err, res) => {
                        if (err || res.statusCode == 500) {
                            reject((res.body && res.body.data) || err);
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
                        if (err || res.statusCode == 500) {
                           // dispatch(ajaxCallError());
                            reject((res.body && res.body.data) || err);
                            throw((res && res.body) || err);
                        } else {
                            if(res.body.status == 'failure') {
                                console.log("entro failure");
                                console.log(res.body.data);
                                dispatch(ajaxCallError());
                                reject(res.body.data);
                            }
                            else {
                                console.log("entro success");
                                dispatch(createRecipeSuccess(res.body.data));
                                resolve(res.body.data);
                            }
                        }
                    });
            }
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
                    if (err || res.statusCode == 500) {
                        reject((res && res.body) || err);
                        throw((res && res.body) || err);
                    } else {
                        //dispatch(updateRecipeSuccess(res.body.data));
                        resolve(res.body.data);
                    }
                });
        });
    };
}

export function commentRecipe(comment) {
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            superagent
                .put(`${appConfig.apiUrl}/recipes/${comment.recipeid}/comments`)
                .set('Content-Type', 'application/json')
                .send(comment)
                .end((err, res) => {
                    if (err || res.statusCode == 500) {
                        reject((res && res.body) || err);
                        throw((res && res.body) || err);
                    } else {
                       // dispatch(updateRecipeSuccess(res.body.data));
                        resolve(res.body.data);
                    }
                });
        });
    };
}

export function deleteComment(recipeId, commentId) {
    return function(dispatch) {
        const comment = {id: commentId};
        return new Promise((resolve, reject) => {
            superagent
                .del(`${appConfig.apiUrl}/recipes/${recipeId}/comments`)
                .set('Content-Type', 'application/json')
                .send(comment)
                .end((err, res) => {
                    if (err || res.statusCode == 500) {
                        reject((res && res.body) || err);
                        throw((res && res.body) || err);
                    } else {
                       // dispatch(updateRecipeSuccess(res.body.data));
                        resolve(commentId);
                    }
                });
        });
    };
}