/**
 * @file  filename / ES module
 * @module module name
 * @author Zdj <https://github.com/dingmike> 2020/12/10
 */

// /apiv1/dic/queryWord


import { Net } from '../utils/request'

export default {
    // search word dic
    queryWord(params) {
        return Net.Get('/test/dic/queryWord', {
            ...params
        })
    },

}
