import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadReceipesSuccess(receipes) {
    return { type: types.LOAD_RECEIPE_SUCCESS, receipes};
}

export function createReceipeSuccess(receipe) {
    return { type: types.CREATE_RECEIPE_SUCCESS, receipe};
}

export function updateReceipeSuccess(receipe) {
    return { type: types.UPDATE_RECEIPE_SUCCESS, receipe};
}

export function loadReceipes() {
    return function(dispatch) {
        return courseApi.getAllCourses().then(receipes => {
            dispatch(loadReceipesSuccess(receipes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveReceipe(receipe) {
    return function(dispatch, getState) {
        return courseApi.saveCourse(receipe).then(savedReceipe => {
            receipe.id 
                ? dispatch(updateReceipeSuccess(savedReceipe))
                : dispatch(createReceipeSuccess(savedReceipe));
        }).catch(error => {
            throw(error);
        });
    };
}