import * as TYPES from '../actionTypes/userTypes';
import { Net } from '../../utils/request'


export function updateData(user){
    return {
        type: TYPES.UPDATE_DATA,
        user: user
    };
}

export function requestData(){
    return dispatch => {
        let url = 'https://my.oschina.net/gef';
        Net.Get('', {}).then(response => {
            console.log("response:" + response);
            return response.text();
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