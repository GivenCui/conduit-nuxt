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
- feat: 15-同构应用的登录状态处理过程 ( 无 coding, JWT 整体认知 )
- feat: 16-登录状态存储到容器中
- feat: 17-登录注册-登录状态持久化
- feat: 18-登录注册 处理导航栏链接根据登录状态展示

### 15-同构应用的登录状态处理过程

> 讲解, 无 coding

#### SPA 应用 (CSR)

- 登录状态存储在 store 或 localStorage 中

#### 同构应用

- 同构应用处理起来不能和 SPA 一样 ??
- 应为无论在客户端渲染 还是 服务端渲染时, 都应该能拿到登录状态
- nuxt [官网解决方案: JWT](https://www.nuxtjs.cn/examples/auth-external-jwt)

### 16 | 17 JWT 方案实践
略

### 18-登录注册 处理导航栏链接根据登录状态展示
- 登录状态: 展示 New Post | Settings | user info
- 未登录转态: 展示 sign in | sign up

问题: 
- 如果未登录状态直接 url 访问: http://localhost:3000/editor, 没有处理
- 方案: 路由拦截 (同构应用略有不同)

### 19-登录注册 处理页面URL直接访问权限
- Chrome Dev Tool 工具中 Application --> 清除 Cookie 中的 user
- 直接访问: http://localhost:3000/editor  验证是否拦截
- 方案: **路由中间件** 参考 [学习指南 -> 路由 -> 中间件](https://www.nuxtjs.cn/guide/routing)
- 特点: 既能处理服务端的路由拦截, 也能处理客户端的路由拦截
- 案例: [codeSandbox](https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/auth-jwt?from-embed=&file=/middleware/authenticated.js)
- 步骤
  - 创建 middleware/authenticated.js
  - 编写 authenticated 中间件, 是一个函数
  - 在 nuxt.config.js 或 页面中 使用 中间件
  - 本案例中: edit页面, settings页面, profile页面需要使用 authenticated 中间件
  - Unknown middleware authenticated 时, 重启 npm run dev 试试
- 思考
  - 中间件中 redirect 的原理?