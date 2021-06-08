/**
 * 注意:
 * 1. nuxt 默认集成了 vuex
 * 2. 在服务端渲染期间, 都是同一个实例, 防止数据冲突, 所以函数返回对象
 * 3. export 导出 state, mutation 等, 否则不生效
 */
export const state = () => {
    return {
        // 当前登录用户的登录状态
        // 可以在 vue devTool 工具 vuex 中查看
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {}