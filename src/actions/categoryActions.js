import * as types from './actionTypes';
import {config} from '../common/config';
import categoryApi from '../api/mockCategoryApi';
import {beginAjaxCall} from './ajaxStatusActions';
import superagent from 'superagent';

export function loadCategoriesSuccess(categories) {
    return { type: types.LOAD_CATEGORY_SUCCESS, categories};
}

export function loadCategories() {
    return (dispatch)  => {
        dispatch(beginAjaxCall());
        superagent
            .get(`${config.apiUrl}/categories`)
            .end((err, res) => {
                if (err) {
                     throw((res && res.body) || err);
                } else {
                    dispatch(loadCategoriesSuccess(res.body));
                }
            });
    };
}