import {LOGIN_REQUEST, SUCCESS, FAILURE, LOGOUT} from './UtilType';

const initialValue = {
    isLoggedIn : ''
};

const reducer = (state = initialValue, action) =>{
    switch(action.type){
        case LOGIN_REQUEST: 
            return {
                ...state
            };
        case LOGOUT:
            return{
                isLoggedIn: false
            } 
        case SUCCESS:
            return{
                isLoggedIn: true
            };   
        case FAILURE:
            return{
                isLoggedIn: false
            };
        default:
            return state;
    };
}
export default reducer