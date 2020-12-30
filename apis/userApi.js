import { Net } from '../utils/request'

export default {

    //
    getMovieData(params) {
        return Net.Get('/getJoke', {
            ...params
        })
    },

    // new user add and save pushToken
    newUser(params) {
        return Net.Post('/test/app/user', {
            ...params
        })
    },


}
