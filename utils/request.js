import axios from 'axios';
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = false  // 如果为true 会报错 The value of the 'Access-Control-Allow-Origin' header in the response must
const instance = axios.create({
    baseURL: 'https://api.apiopen.top', // http://learn.fecstec.com/api/rsscontent/10?type=economistWord
    timeout: 3000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

//请求拦截处理
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


const Post = async (api, params) => {
    return new Promise((resolve, reject) => {
        instance.post(api, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}




const Get = async (api, params) => {
    return new Promise((resolve, reject) => {
        instance({ url: api, method: 'GET', params: params})
            .then(res => {
            resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })

        /*instance.get(api, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })*/
    })
}

const Put = async (api, params) => {
    return new Promise((resolve, reject) => {
        instance.put(api, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const Delete = async (api, params) => {
    return new Promise((resolve, reject) => {
        instance.delete(api, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const Net = {
    Get,
    Put,
    Delete,
    Post
}