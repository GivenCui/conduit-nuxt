/**
 * Nuxt.js 配置文件
 * https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-router/#extendroutes
 */

 export default {
    router: {
      extendRoutes(routes, resolve) {
        // console.log('----->', routes) // <-- console.log 在 控制台打印
        // 清空 routes 数组, 清除 Nuxt.js 基于 pages 目录的 默认配置
        routes.splice(0)

        routes.push(...[
            {
                path: '/',
                component: resolve(__dirname, 'pages/layout/'),
                children: [
                    {
                        path: '', // 默认子路由
                        name: 'home',
                        component: resolve(__dirname, 'pages/home/')
                    },
                    {
                        path: '/login',
                        name: 'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/register',
                        name: 'register',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/profile/:username',
                        name: 'profile',
                        props: true,
                        component :resolve(__dirname, 'pages/profile/')
                    },
                    {
                        path: '/settings',
                        name: 'settings',
                        component :resolve(__dirname, 'pages/settings/')
                    },
                    {
                        path: '/editor',
                        name: 'editor',
                        component :resolve(__dirname, 'pages/editor/')
                    },
                    {
                        path: '/article/:slug',
                        props: true,
                        name: 'article',
                        component :resolve(__dirname, 'pages/article/')
                    }
                ]
            }
        ])

        // routes.push({
        //   name: 'custom',
        //   path: '*',
        //   component: resolve(__dirname, 'pages/404.vue')
        // })
      },
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    // 注册插件
    plugins: [
        '~/plugins/fetch.js',
        '~/plugins/dayjs.js'
    ]
  }