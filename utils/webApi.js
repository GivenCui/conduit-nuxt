/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'

const request = axios.create({
    baseURL: 'https://conduit.productionready.io', // api 不放到baseURL 中, 升级 api2
})

// TODO: 请求拦截器


// TODO: 响应拦截器

export default request