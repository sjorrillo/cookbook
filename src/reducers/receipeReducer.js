import * as types from '../actions/actionTypes';

export default function receipeReducer(state = [], action) {
    debugger;
    switch (action.type) {
        case types.LOAD_RECEIPE_SUCCESS:
            return action.receipes;
    
        case types.CREATE_RECEIPE_SUCCESS:
            return [
                ...state, 
                Object.assign({}, action.receipe)
            ];

        case types.UPDATE_RECEIPE_SUCCESS:
            return [
                 ...state.filter(receipe => receipe.id !== action.receipe.id),
                 Object.assign({}, action.receipe)
            ];
            
        default:
            return state;
    }
}