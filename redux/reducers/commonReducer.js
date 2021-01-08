import * as TYPES from '../actionTypes/commonTypes';

const initState = {
    showAd: false, // 默认不显示ad
    internetReachable: true, // default net reachable
};

export default function commonReducer(state = initState,action){
    switch(action.type){
        case TYPES.SHOW_AD:
            return Object.assign({}, state,{showAd : action.showAd});
        case TYPES.NET_INFO:
            return  Object.assign({}, state, {internetReachable: action.internetReachable});
        default:
            return state;
    }

}
