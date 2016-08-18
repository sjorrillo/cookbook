import {combineReducers} from 'redux';
import recipes from './recipeReducer';
import categories from './categoryReducer';
import filter from './searchHeaderReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    recipes,
    categories,
    filter,
    ajaxCallsInProgress
});

export default rootReducer;