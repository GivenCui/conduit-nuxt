<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

              <ul class="error-messages" >
                <template v-for="(msgArr, field) in errors" >
                  <li v-for="(msg, idx) in msgArr" :key="field + idx">{{field}} {{msg}}</li>
                </template>
              </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Your Name"
                     v-model="user.username"
                     required       
              >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="email"
                     placeholder="Email"
                     v-model="user.email"
                     required
              >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     v-model="user.password"
                     required
                     minlength="8"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user.js'
// nuxt 提供的 process.client  true 表示运行在客户端
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'LoginIndex',
    computed: {
        isLogin () {
            return this.$route.name === 'login'
        }
    },
    data () {
      return {
        user: {
          username: '',
          email: '',
          password: ''
        },
        // 错误信息 测试
        errors: {
          // 'email or password': ['is invilide', 'is a'],
          // "password": [
          //   "can't be empty"
          // ]
        }
      }
    },
    methods: {
      async onSubmit () {
        let apiFn = this.isLogin ? login : register
        try {
          // 提交表单, 请求登录
          let { data } = await apiFn({
              user: this.user
          })

          // 保存用户登录状态, 鉴权
          // data 中返回有用户的登录信息和鉴权参数 token
          // 参考: https://github.com/gothinkster/realworld/tree/master/api#users-for-authentication
          // console.log(data)
          this.$store.commit('setUser', data.user) // 1. 存到 vuex 容器 store 中

          //  为了防止刷新页面数据丢失, 我们需要把数据持久化
          Cookie.set('user', data.user)
          

          // 跳转首页
          this.$router.push('/')
        } catch (error) {
          // console.log 打印不出来
          // error.response.data.errors['email or password']  <-- key
          // { 'email or password' : ['is invalid'] }
          console.dir(error)
          this.errors = error.response.data.errors
        }
      }
    }
}
</script>

<style>
</style>