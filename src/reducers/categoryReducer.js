import * as types from '../actions/actionTypes';

export default function categoryReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_CATEGORY_SUCCESS:
            return action.categories;
    
        default:
            return state;
    }
}