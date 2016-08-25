import {combineReducers} from 'redux';
import recipes from './recipesReducer';
import recipe from './recipeReducer';
import categories from './categoryReducer';
import filter from './searchHeaderReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

export const rootReducer = combineReducers({
    recipes,
    recipe,
    categories,
    filter,
    ajaxCallsInProgress
});