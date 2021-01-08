import * as TYPES from '../actionTypes/userTypes';

const initState = {
    flag: 1, //1请求中 2请求成功
    user: null,
};

export default function userReducer(state = initState,action){
    switch(action.type){
        case TYPES.LOAD_USER:
            return Object.assign({},state,{flag : 1});
        case TYPES.UPDATE_DATA:
            return Object.assign({},state,{user : action.user});
        default:
            return state;
    }

}
