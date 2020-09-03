/**
 * getters 和 组件的 computed 类似，
 * 方便直接生成一些可以直接用的数据。
 * 当组装的数据要在多个页面使用时，
 * 就可以使用 getters 来做。
 */
//取state的user对象
export const user = state => state.user
