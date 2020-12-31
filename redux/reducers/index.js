import { combineReducers } from "redux";

import courseReducer from './courseReducer'
import userReducer from './userReducer'
import commonReducer from './commonReducer'

const reducers = combineReducers({
    courseReducer,
    userReducer,
    commonReducer
})

export default reducers
