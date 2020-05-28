import * as TYPES from '../actionTypes/userTypes';
import userApi from '../../apis/userApi'


export function updateData(user){
    return {
        type: TYPES.UPDATE_DATA,
        user: user,
        jokerVideo: user
    };
}

export function requestData(){
    return dispatch => {
        let url = 'https://my.oschina.net/gef';
        userApi.getMovieData({page: 1, count: 2, type: 'video'}).then(response => {
            console.log(response);
            if (response) {
                debugger
                dispatch(updateData(response.result));
            }
            // return response;
        }).catch((error) => {
            console.log("error:" + error);
        });
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