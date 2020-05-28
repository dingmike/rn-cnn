import * as TYPES from '../actionTypes/userTypes';

const initState = {
    flag: 1, //1请求中 2请求成功
    user: null,
    jokerVideo: null
}

export default function addUser(state = initState,action){
    switch(action.type){
        case TYPES.LOAD_USER:
            return Object.assign({},state,{flag : 1});
        case TYPES.UPDATE_DATA:
            debugger
            return Object.assign({},state,{flag : 2, user : action.user, jokerVideo: action.jokerVideo});
        default:
            return state;
    }

}