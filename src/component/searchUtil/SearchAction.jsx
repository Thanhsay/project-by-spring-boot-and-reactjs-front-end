import {SEARCH} from './SearchType';

export const solveSearch = (log) =>{
    return dispatch =>{
        dispatch({type: SEARCH, payload: log});
    };
}