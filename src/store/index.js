/**
 每当store.state.count变化的时候,
 都会重新求取计算属性并且触发更新相关联的 DOM。
 然而，这种模式导致组件依赖全局状态单例。
 在模块化的构建系统中在每个需要使用 state 的组件中需要频繁地导入，
 并且在测试组件时需要模拟状态Vuex 通过store选项，
 提供了一种机制将状态从根组件“注入”到每一个子组件中且子组件能通过this.$store访问到。
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})