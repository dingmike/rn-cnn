import { Net } from '../utils/request'

export default {
    // 系统设置
    getShowSomething(params) {
        return Net.Get('/app/activity/course/show', {
            ...params
        })
    },
}
