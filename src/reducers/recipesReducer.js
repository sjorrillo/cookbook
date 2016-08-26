import * as types from '../actions/actionTypes';
import _ from 'lodash';

export default function recipesReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_RECIPES_SUCCESS:
            return action.recipes;
    
        // case types.CREATE_RECIPE_SUCCESS:
        //     return [
        //         ...state, 
        //         Object.assign({}, action.recipe)
        //     ];

        // case types.UPDATE_RECIPE_SUCCESS: {
        //     let recipes = [...state];
        //     let recipe = _.find(recipes, (x) =>  x.id == action.recipe.id);
        //     const index = _.indexOf(recipes, recipe);
        //     recipes.splice(index, 1, action.recipe);

        //     return recipes;
        // }

         case types.DELETE_RECIPE_SUCCESS: {
            let recipes = [...state];
            let recipe = _.find(recipes, (x) =>  x.id == action.id);
            const index = _.indexOf(recipes, recipe);
            recipes.splice(index, 1);

            return recipes;
        }

        default:
            return state;
    }
}