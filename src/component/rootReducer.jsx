import {combineReducers} from 'redux';
import UtilReducer from "./Utils/UtilReducer";
import EmpReducer from "./Employees/EmpUtil/EmpReducer";

const rootReducer = combineReducers({
    auth: UtilReducer,
    empl: EmpReducer
});

export default rootReducer;