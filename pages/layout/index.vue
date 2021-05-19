<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link class="navbar-brand"
                   to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- <a class="nav-link active" href="">Home</a> -->
            <nuxt-link class="nav-link active"
                       to="">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       to="/editor"><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       to="/settings"><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       to="/login">Sign in</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       to="/register">Sign up</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link"
                       to="/profile/1">
              <img class="user-pic"
                   src="https://avatars.githubusercontent.com/u/17002107?s=400&amp;u=e86d6529e37d7cd872b20005ebbe86be72e7a38e&amp;v=4" />
              givencui
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->
    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->
    <!-- 底部导航栏 -->
    <footer>
      <div class="container">
        <a href="/"
           class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
</style>