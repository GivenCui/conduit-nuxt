/**
 * Nuxt.js 配置文件
 * https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-router/#extendroutes
 */

 export default {
    router: {
      extendRoutes(routes, resolve) {
        console.log('----->', routes) // <-- console.log 在 控制台打印
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
                ]
            }
        ])

        // routes.push({
        //   name: 'custom',
        //   path: '*',
        //   component: resolve(__dirname, 'pages/404.vue')
        // })
      }
    }
  }