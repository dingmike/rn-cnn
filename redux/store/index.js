import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // 异步action的支持 需要加入redux的中间件redux-thunk，应用中间件的方法是使用redux提供的 applyMiddleware

import reducers from '../reducers'

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store