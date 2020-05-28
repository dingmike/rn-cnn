import { Net } from '../utils/request'

export default {

    //
    getMovieData(params) {
        return Net.Get('/getJoke', {
            ...params
        })
    },

    // 注册新用户
    newUser(params) {
        return Net.Post('/user/smbuser/new', {
            ...params
        })
    },


}
