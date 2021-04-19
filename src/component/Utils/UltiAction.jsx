import {LOGIN_REQUEST, SUCCESS, FAILURE, LOGOUT} from './UtilType'

export const authenticateUser = (username, password) =>{
    let user = 'admin';
    let pass = 'sopen';
    return dispatch => {
       // dispatch(loginRequest());
        if(username == user && password == pass){
            dispatch({type: SUCCESS, payload: true});
        }else{
            dispatch({type: FAILURE, payload: false});
        }
    };
}

export const logOut = () =>{
    return dispatch =>{
        dispatch({type: LOGOUT, payload: false});
    }
}

// const loginRequest = () =>{
//     return {
//         type: LOGIN_REQUEST
//     }
// }

// const success = () =>{
//     return{
//         type: SUCCESS,
//         payload: true
//     };
// }

// const failure = () =>{
//     return{
//         type: FAILURE,
//         payload: false
//     };
// }
