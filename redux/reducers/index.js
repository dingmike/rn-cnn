import { combineReducers } from "redux";

import courseReducer from './courseReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
    courseReducer,
    userReducer
})


export default reducers