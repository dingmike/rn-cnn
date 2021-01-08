import * as TYPES from '../actionTypes/courseTypes';

export function updateCourseData(user){
    return {
        type: TYPES.GET_COURSE_LIST,
        user: user
    };
}

export function requestCourseData(){
    return dispatch => {
        let url = 'https://my.oschina.net/gef';
        fetch(url)
            .then((response) =>{
                console.log("response:" + response);
                return response.text();
            })
            .then((responseText) => {
                console.log("responseText:" + responseText);
                if (responseText) {
                    let user = {
                        'name' : "mike",
                        'age' : 18,
                        'job' :'developer'
                    };
                    dispatch(updateCourseData(user));
                }
            })
            .catch((error) => {
                console.log("error:" + error);
            });
    };

}
