# conduit-nuxt

conduit基于nuxt.js实现版本

## 步骤

- feat: 安装nuxt, 配置scripts
- feat: 1-项目初始化样式转为国内CDN 或 本土化
- feat: 2-项目初始化app.html挪到根目录
- feat: 3-项目初始化nuxtjs 默认路由配置不满足需求, 配置 nuxt.config.js 覆盖默认路由配置
- feat: 4-项目初始化home 页面导入
- feat: 5-项目初始化-登录/注册页面导入和设置完成
- feat: 6-项目初始化-导入其他剩余模板
- feat: 7-项目初始化-处理顶部nav中的导航链接
- feat: 8-项目初始化-处理导航链接高亮
- feat: 9-项目初始化-封装请求模块
- feat: 10-登录注册-实现基本登录功能
- feat: 11-登录注册-封装请求方法
- feat: 12-登录注册-表单验证 ( 浏览器原生方式 )
- feat: 13-登录注册-错误处理
- feat: 14-登录注册-用户注册
- feat: 15-登录注册-同构应用的登录状态处理过程 ( 无 coding, JWT 整体认知 )
- feat: 16-登录注册-登录状态存储到容器中
- feat: 17-登录注册-登录状态持久化
- feat: 18-登录注册 处理导航栏链接根据登录状态展示
- feat: 19-登录注册 处理页面URL直接访问权限
- feat: 20-首页-业务介绍 (无 coding)
- feat: 21-首页-展示公共文章列表
- feat: 22-首页-列表分页-分页参数的使用
- feat: 23-首页-列表分页-页码处理
- feat: 24-首页-展示文章标签列表
- feat: 25-首页-优化并行异步任务
- feat: 26-首页-处理标签列表链接和数据
- feat: 27-首页-处理导航栏业务介绍
- feat: 28-首页-处理导航栏-展示状态处理
- feat: 29-首页-处理导航栏-标签高亮及链接
- feat: 30-首页-处理导航栏-展示用户关注的文章列表
- feat: 31-首页-统一设置用户 Token
- feat: 32-首页-文章发布时间格式化处理
- feat: 33-首页-文章点赞
- feat: 34-文章详情-业务介绍
- feat: 35-文章详情-展示基本信息
- feat: 36-文章详情-把Markdown转为HTML
- feat: 40-发布部署-打包
- feat: 41-发布部署-最简单的部署方式
- feat: 42-发布部署-PM2 启动Node服务
- feat: 43-发布部署-自动化部署介绍
- feat: 44-发布部署-准备自动部署内容

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

### 21-首页-展示公共文章列表
[接口 GET /api/articles](https://github.com/gothinkster/realworld/tree/master/api#list-articles)

### 22-首页-列表分页-分页参数的使用

接口 /api/articles
- ?limit=20
- ?offset=0 数据偏移量, 和页面有关

```js
// 计算公式
// limit 每页数据条数
// offset 数据偏移量, 0 开始
// articlesCount 总数据量

// page 第几页, 1 开始
offset = (page - 1) * limit

// pageCounts 总页数
pageCounts = Math.ceil(articlesCount / limit) 

```

### 23-首页-列表分页-页码处理
![img](img/pagination.png)

[参考示例样式](https://demo.realworld.io/#/)


默认情况下，query 的改变不会调用asyncData方法。如果要监听这个行为，例如，在构建分页组件时，您可以设置应通过页面组件的[watchQuery属性](https://www.nuxtjs.cn/api/pages-watchquery)监听参数

### 24-首页-展示文章标签列表
![image](img/popular-tags.png)

[GET /api/tags](https://github.com/gothinkster/realworld/tree/master/api#get-tags)

### feat: 27-首页-处理导航栏业务介绍
![image](img/nav-bar.png)

1. 未登录时只显示 'Global Feed', 需要区分登录态
2. 'Your Feed', 登录时展示
3. 标签导航点击标签时出现, 
  
### feat: 31-首页-统一设置用户 Token
鉴权写在 axios 的 拦截器 [interceptors](https://github.com/axios/axios#interceptors) 中

[参考 博文](https://juejin.cn/post/6844904022353117192)

#### 基本用法
```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

#### 如何在拦截器中获取用户 token ?

```js
instance.interceptors.request.use(function(config) {
   
   config.headers.Authorization = `Token ${token ???}` // <-- 如何获取

    return config
}, function(error) {
    // 请求未发出就失败的情况
    return Promise.reject(error)
})
```
参考 [nuxt 插件](https://www.nuxtjs.cn/guide/plugins)


### feat: 32-首页-文章发布时间格式化处理
- [dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md) 
- 在全局过滤器中实现
- vue 的过滤器 ?
- nuxt 的过滤器 ?
  - 需要 nuxt.config.js 中注册插件
```js
// 期望格式处理为: August 1, 2021
dayjs('2019-01-25').format('MMM D, YYYY')
```

### feat: 33-首页-文章点赞
- POST [/api/articles/:slug/favorite](https://github.com/gothinkster/realworld/tree/master/api#favorite-article)
- DELETE [/api/articles/:slug/favorite](https://github.com/gothinkster/realworld/tree/master/api#unfavorite-article)

注意: 弱网情况下连续点赞/取消点赞需要标识处理, 防止多次无效请求

### feat: 34-文章详情-业务介绍
- 文章详情
- 作者详情, 关注, 点赞
- 评论

### feat: 35-文章详情-展示基本信息
- `pages/article/index.vue`
- [GET /api/articles/:slug](https://github.com/gothinkster/realworld/tree/master/api#get-article)

### feat: 36-文章详情-把Markdown转为HTML
- [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it)

### feat: 40-发布部署-打包
- `nuxt build` 然后 `nuxt start`  [参考](https://www.nuxtjs.cn/guide/commands)
- 打包的生成文件为 .nuxt

### feat: 41-发布部署-最简单的部署方式
- 配置 Host + port `nuxt.config.js 修改 host 为 0.0.0.0`
- 压缩发布包 `.nuxt\ static\ nuxt.config.js package.json package-lock.json 打包为 zip`
- scp 发布包 到服务端 `scp 本地路径  root@xx.xx.xx.xx:服务器路径`
- 解压 `unzip -q xxx.zip`
- 安装依赖 `npm install`
- 启动服务 `npm run start`, 通过`公网ip:3000` 访问

### feat: 42-发布部署-PM2 启动Node服务
> 解决 node 命令不能后台执行的问题

- [github](https://github.com/Unitech/pm2)
- [官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/)
- 安装 `npm install pm2 -g`
- 启动 `pm2 start 脚本路径`


|命令|说明|
|---|---|
|`pm2 list`|查看应用列表|
|`pm2 start`|启动应用|
|`pm2 stop`|停止应用|
|`pm2 restart`|重启应用|
|`pm2 reload`|重载应用 (推荐)|
|`pm2 delete`|删除应用|

举例:
```sh
# npm run start
pm2 start npm -- run start

# 查看服务列表
pm2 list

# 停止服务
pm2 stop npm # 或 id

```
pm2 reload 和 pm2 restart 区别:
> With reload, pm2 restarts all processes one by one, always keeping at least one process running,  reload 会至少保证有一个进程运行

### feat: 43-发布部署-自动化部署介绍
![img](https://cdn.nlark.com/yuque/0/2021/png/460925/1633770604420-7c112efb-196a-4209-b380-fe6931409301.png?x-oss-process=image%2Fresize%2Cw_1504%2Climit_0)

总结
- 4个平台: 用户本地; git服务; ci/cd服务 (Jenkins); web 服务器
- git push 时, 通知 jenkins 自动编译/构建, 或在 jenkins 手动编译/构建
- 构建后的文件 弄到(scp) web 服务器, 如果 node服务, 需要 pm2 启动服务

### feat: 44-发布部署-准备自动部署内容
常见 CI/CD 服务
- `Jenkins`
- `Gitlab CI`
- `Github Actions` <-- 演示
- `Travis CI`

#### 配置 Github `Personal Access Token`
- 生成 PAT, https://github.com/settings/tokens `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`
- 配置到项目中的 [Secrets](https://github.com/GivenCui/conduit-nuxt/settings/secrets/actions)

#### 配置 Github Actions 执行脚本
- 根目录创建 `.github/workflows` 目录
- 下载 `main.yml` 到 `workflows` 目录中
- 修改配置 `main.yml`
  - [gist](https://gist.github.com/GivenCui/b487585f0918769d2a88e8f7ec5be9de)
  - [了解 github actions](https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions)
  - [yml 文档说明](https://docs.github.com/cn/actions/learn-github-actions/workflow-syntax-for-github-actions)
  - [GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
- 配置 `PM2` 配置文件
- 提交更新
- 查看自动部署状态
- 访问网站
- 提交更新