import * as types from './actionTypes';
import categoryApi from '../api/mockCategoryApi';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadCategoriesSuccess(categories) {
    return { type: types.LOAD_CATEGORY_SUCCESS, categories};
}

export function loadCategories() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return categoryApi.getAllCategories().then(categories => {
            dispatch(loadCategoriesSuccess(categories));
        }).catch(error => {
            throw(error);
        });
    };
}