/**
 * 基于 axios 封装的请求模块
 */

 import axios from 'axios'

 export const fetch = axios.create({
     baseURL: 'https://conduit.productionready.io', // api 不放到baseURL 中, 升级 api2
 })
 
 // nuxt 的插件 机制写法: 注入 context
 // 插件固定写法, 默认导出的函数
 // 参考: https://www.nuxtjs.cn/guide/plugins

 export default function ({ app, store }) {

    console.log('nuxt 插件运行了 -- fetch')

    // 请求拦截器
    // 1. 任何请求都经过拦截器
    // 2. 请求之前, 做一些公共的处理, e.g. 设置 token
    fetch.interceptors.request.use(function(config) {
        // 正常请求的情况
        console.log(`拦截器 --> ${config.method} ${config.url}`);

        const {
            user
        } = store.state

        if(user && user.token) {
            config.headers.Authorization = `Token ${user.token}` // <-- 如何获取 token ??? -- 第三方模块作为 nuxt 插件
        }

        return config
    }, function(error) {
        // 请求未发出就失败的情况
        return Promise.reject(error)
    })

    // TODO: 响应拦截器
 }