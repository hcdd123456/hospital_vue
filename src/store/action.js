//Action可以包含任意异步操作中,不进行状态的直接更改，而是通过commit触发mutation
import * as types from './mutation-types'
export const setUser = function({commit},user){
    commit(types.SET_USER,user)
}

