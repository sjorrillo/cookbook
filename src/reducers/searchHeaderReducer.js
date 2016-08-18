import * as types from '../actions/actionTypes';

export default function searchHeaderReducer(state = "", action) {
    switch (action.type) {
        case types.UPDATE_FILTER_STATE:
            return action.filter;
    
        default:
            return state;
    }
}