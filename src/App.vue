<template>
  <div style="height:100%">
    <login v-if="!$store.state.user.NickName"></login>
    <div v-else class="main">
      <div class="chat-container">
        <nav-menu></nav-menu>

        <div class="chat-area"></div>
      </div>

      <p class="copyright">
        <span>© 1998 - 2017 Tencent Inc. All Rights Reserved</span>
        <span class="sep"></span>
        <a href="https://login.weixin.qq.com/faq_webwx?lang=zh_CN" target="_blank">Help</a>
      </p>
    </div>
  </div>
</template>

<script>
  import './assets/css/main.scss'
  import Login from './components/Login.vue'
  import NavMenu from './components/NavMenu.vue'

  export default {
    name      : 'app',
    components: {
      Login,
      NavMenu
    }
  }
</script>

<style lang="scss" type="text/scss">
  .main {
    .chat-container {
      max-width: 1000px;
      min-width: 800px;
      width: 100%;
      height: 720px;
      margin: 0 auto;
      border-radius: 3px;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .nav-menu {
        float: left;
      }

      .chat-area {
        height: 100%;
        background: #eeeeee;
      }
    }

    .copyright {
      position: absolute;
      bottom: 30px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #e3e3e3;
    }
  }
</style>
