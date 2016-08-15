import {combineReducers} from 'redux';
import receipes from './receipeReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
    receipes,
    authors
});

export default rootReducer;