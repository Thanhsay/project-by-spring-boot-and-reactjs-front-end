import {SEARCH} from './SearchType';

const initLogValue = {
    log: ''
};

const reducerLog = (state = initLogValue, action) =>{
    switch(action.type){
        case SEARCH :
            return{
                log: action.payload
            } 
        default: 
            return{
                state
            }
    }
}

export default reducerLog;