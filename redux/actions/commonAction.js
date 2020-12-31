import * as TYPES from '../actionTypes/commonTypes';
import commonApi from '../../apis/commonApi'
// import {err} from "react-native-svg/lib/typescript/xml";


export function updateData(showAd){
    return {
        type: TYPES.SHOW_AD,
        showAd: showAd,
    };
}

export function requestData(params){
    return dispatch => {
        commonApi.getShowSomething(params).then(response => {
            console.log(response.data)
            dispatch(updateData(response.data.status == 1));
        }).catch(error => {
            console.log("error:" + error);
        })
    };

}
