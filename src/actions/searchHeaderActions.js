import * as types from './actionTypes';

export function updateFilterState(filter) {
    return { type: types.UPDATE_FILTER_STATE, filter};
}
