//mutations是store状态的更新唯一方式
import * as types from './mutation-types'

const mutations = {
    //设置用户
    [types.SET_USER](state,user){
        state.user = user
    }
}

export default mutations
