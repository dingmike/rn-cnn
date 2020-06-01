import { Net } from '../utils/request'

export default {

    //
    allArticleList(params) {
        return Net.Post('/test/article/allList', {
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
