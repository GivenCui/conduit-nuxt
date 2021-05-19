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

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Email"
                     v-model="user.email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     v-model="user.password"
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
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async onSubmit () {
        // 提交表单, 请求登录
        let { data } = await login({
            user: this.user
        })

        console.log(data)
        // 保存用户登录状态, 鉴权

        // 跳转首页
        this.$router.push('/')
      }
    }
}
</script>

<style>
</style>