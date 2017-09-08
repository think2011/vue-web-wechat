<template>
  <div>
    <login v-if="!$store.state.user.NickName"></login>

    <div v-else class="main">
      登录成功 {{$store.state.user.NickName}}

      <div class="footer">
        <p class="copyright">
          <span>© 1998 - 2017 Tencent Inc. All Rights Reserved</span>
          <span class="sep"></span>
          <a href="https://login.weixin.qq.com/faq_webwx?lang=zh_CN" target="_blank">Help</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import './assets/css/main.scss'
  import Login from './components/Login.vue'

  export default {
    name      : 'app',
    components: {
      Login
    }
  }
</script>

<style lang="scss" type="text/scss">
</style>
