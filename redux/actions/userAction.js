import * as TYPES from '../actionTypes/userTypes';
import userApi from '../../apis/userApi'
// import {err} from "react-native-svg/lib/typescript/xml";


export function updateData(user){
    return {
        type: TYPES.UPDATE_DATA,
        user: user,
    };
}

export function requestData(params){
    return dispatch => {
        userApi.newUser(params).then(response => {
            console.log(response)
            dispatch(updateData(response.data));
        }).catch(error => {
            console.log("error:" + error);
        })
            /*   fetch(url)
            .then((response) =>{
                console.log("response:" + response);
                return response.text();
            })
            .then((responseText) => {
                console.log("responseText:" + responseText);
                if (responseText) {
                    let user = {
                        'name' : "葛夫锋",
                        'age' : 18,
                        'job' :'developer'
                    };
                    dispatch(updateData(user));
                }
            })
            .catch((error) => {
                console.log("error:" + error);
            });*/
    };

}
