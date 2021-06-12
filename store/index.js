/**
 * 注意:
 * 1. nuxt 默认集成了 vuex
 * 2. 在服务端渲染期间, 都是同一个实例, 防止数据冲突, 所以函数返回对象
 * 3. export 导出 state, mutation 等, 否则不生效
 */

const cookieParser = process.server ? require('cookieparser') : undefined

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

export const actions = {
    // nuxt 中的 action 方法, 这个 action 会在服务端渲染期间自动调用
    // 作用: 初始化容器数据, 传递数据给客户端
    nuxtServerInit({ commit }, { req }) {
        // console.log('运行在哪里?') // Nuxt SSR
        let user = null

        // 如果请求头中有 Cookie
        if(req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie)
            // console.log(parsed) // Nuxt SSR
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie Found
            }
        }

        // 提交 mutation 修改 state 状态
        // TODO: 一个问题: user 数据存储在了哪里, 如何从服务端传到了客户端, 最后被 commit 存在 store 中呢??
        commit('setUser', user)
    }
}