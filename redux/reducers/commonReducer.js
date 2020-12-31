import * as TYPES from '../actionTypes/commonTypes';

const initState = {
    showAd: false, // 默认不显示
};

export default function addUser(state = initState,action){
    switch(action.type){
        case TYPES.SHOW_AD:
            return Object.assign({},state,{showAd : action.showAd});
        default:
            return state;
    }

}
