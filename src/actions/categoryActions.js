import * as types from './actionTypes';
import categoryApi from '../api/mockCategoryApi';
import {beginAjaxCall} from './ajaxStatusActions';
import superagent from 'superagent';

export function loadCategoriesSuccess(categories) {
    return { type: types.LOAD_CATEGORY_SUCCESS, categories};
}

export function loadCategories() {
    return (dispatch)  => {
        dispatch(beginAjaxCall());
        // return categoryApi.getAllCategories().then(categories => {
        //     dispatch(loadCategoriesSuccess(categories));
        // }).catch(error => {
        //     throw(error);
        // });
        superagent
            .get('http://localhost:3032/api/categories')
            .end((err, res) => {
                if (err) {
                     throw((res && res.body) || err);
                } else {
                    dispatch(loadCategoriesSuccess(res.body));
                }
            });
        // const categories = await categoryApi.getAllCategories();
        // if(categories)
        //     dispatch(loadCategoriesSuccess(categories));
    };
}