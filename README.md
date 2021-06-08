# conduit-nuxt

conduit基于nuxt.js实现版本

## 步骤

- feat: 安装nuxt, 配置scripts
- feat: 样式转为国内CDN 或 本土化
- feat: app.html挪到根目录
- feat: nuxtjs 默认路由配置不满足需求, 配置 nuxt.config.js 覆盖默认路由配置
- feat: home 页面导入
- feat: 5-登录/注册页面导入和设置完成
- feat: 6-导入其他剩余模板
- feat: 7-处理顶部nav中的导航链接
- feat: 8-处理导航链接高亮
- feat: 9-封装请求模块
- feat: 10-实现基本登录功能
- feat: 11-封装请求方法
- feat: 12-表单验证 ( 浏览器原生方式 )
- feat: 13-错误处理
- feat: 14-用户注册
- feat: 15-同构应用的登录状态处理过程

### 15-同构应用的登录状态处理过程

> 讲解, 无 coding

#### SPA 应用 (CSR)

- 登录状态存储在 store 或 localStorage 中

#### 同构应用

- 同构应用处理起来不能和 SPA 一样 ??
- 应为无论在客户端渲染 还是 服务端渲染时, 都应该能拿到登录状态
- nuxt [官网解决方案: JWT](https://www.nuxtjs.cn/examples/auth-external-jwt)
