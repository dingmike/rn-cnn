
import * as TYPES from '../actionTypes/courseTypes'





const courseInitState = {
    courseList: [],
    loading: true,
};


export default function (state = courseInitState, action) {

    switch (action.type) {

        case TYPES.GET_COURSE_LIST:
            return {...state, courseList: action.courseList};

        case TYPES.COURSE_LOADING:
            return {...state, loading: action.loading}
        default:
            return state;
    }
}