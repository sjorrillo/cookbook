import {combineReducers} from 'redux';
import recipes from './recipeReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    recipes,
    authors,
    ajaxCallsInProgress
});

export default rootReducer;