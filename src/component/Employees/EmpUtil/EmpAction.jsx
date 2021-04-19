import DetailProject from '../../DetailProject';
import {UPDATE, DELETE, DETAIL} from './EmpType';

export const solveId = (id) =>{
    return dispatch =>{    
        dispatch({type: UPDATE, payload: id});
    };
}

export const solveDetail = (id) =>{
    return dispatch =>{
        dispatch({type:DETAIL, payload: id});
    };
}