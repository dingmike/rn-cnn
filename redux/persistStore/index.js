import { persistStore, persistReducer } from 'redux-persist';
import AppReducer from '../reducers';
// 日志中间件,仅在开发环境下使用,必须放在最后
// import logger from 'redux-logger';
// 异步分发action中间件
import {AsyncStorage} from 'react-native';
// import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
//增加
//AsyncStorage.setItem('text', '葫芦小金刚', (error) => {
//             error ? this.setState({ text: '增加失败' }) : this.setState({ text: '增加成功' })
//           })

/*
删除
* AsyncStorage.removeItem('text',(error)=>{
            error ? this.setState({ text: '删除失败' }) : this.setState({ text: '删除成功' })
          })
* */


/*
更改
* AsyncStorage.setItem('text', '爷爷',(error)=>{
            error ? this.setState({ text: '更改失败' }) : this.setState({ text: '更改成功' })
          })
* */

/*
* 查询
* AsyncStorage.getItem('text').then((value) => {
            if (value) {
              this.setState({
                text: value,
              })
            }else{
              this.setState({
                text:'啥也没存'
              })
            }
          })
* */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // 异步action的支持 需要加入redux的中间件redux-thunk，应用中间件的方法是使用redux提供的 applyMiddleware


const config = {
    key: 'Root',
    storage: AsyncStorage,
    // whitelist: ['login'] // 配置想要持久化的部分store
};

const reducer = persistReducer(config, AppReducer);
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export  {
    persistor,
    store
}
