import * as types from '../actions/actionTypes';

export default function recipeReducer(state = null, action) {
    switch (action.type) {
        case types.GET_RECIPE_SUCCESS:
            return action.recipe;
    
        default:
            return state;
    }
}