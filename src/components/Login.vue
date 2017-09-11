<template>
  <div class="login-container">
    <div class="logo">
      <i class="i-logo"></i>
    </div>

    <div class="box">
      <div class="isScan" v-if="isScan">
        <div class="avatar">
          <img :src="avatar" alt="">
        </div>
        <p class="title">扫描成功</p>
        <p class="sub-title">请在手机上点击确认以登录</p>
        <a @click="cancel()" href="javascript:" class="action">切换账号</a>
      </div>

      <div v-else>
        <div class="qrcode">
          <img :src="logoQrCode">
        </div>
        <p class="title">使用手机微信扫码登录</p>
        <p class="sub-title">网页版微信需要配合手机使用</p>
      </div>
    </div>

    <p class="copyright">
      © 1998 - 2017 Tencent Inc. All Rights Reserved
    </p>
  </div>
</template>

<script>
  import types from '../store/mutation-types'
  import api from '../api'

  export default {
    data(){
      return {
        logoQrCode: '',
        avatar    : '',
        isScan    : false
      }
    },

    computed: {},

    async created() {
      // TODO ZH 9/8/17 刷新页面后凭证有效，自动登录
      this.showLogin()
    },

    methods: {
      async watchLoginStatus(params) {
        const res = await api.login.fetchLoginStatus(params)

        switch (res.code) {
          case 408:
            this.watchLoginStatus(params)
            break;

          case 201:
            this.isScan = true
            this.avatar = res.userAvatar

            params.tip = 0
            setTimeout(() => {
              this.watchLoginStatus(params)
            }, 500)
            break;

          case 200:
            let authRes = await api.login.autoLogin(res.redirect_uri)
            this.$store.commit(types.UPDATE_WX_PARAMS, authRes)
            this.$store.dispatch('initPage')
            break;

          default:
          //
        }
      },

      async showLogin() {
        const uuid = await api.login.fetchUuid()

        this.logoQrCode = `/api/login/qrcode/${uuid}`
        setTimeout(() => {
          this.watchLoginStatus({uuid, loginicon: true, tip: 1})
        }, 1000)
      },

      cancel() {
        this.isScan = false
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .login-container {
    .logo {
      position: absolute;
      left: 60px;
      top: 60px;
    }

    .box {
      width: 380px;
      height: 540px;
      box-shadow: 0 2px 10px #999;
      border-radius: 4px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .qrcode {
        width: 270px;
        height: 270px;
        margin: 42px auto 12px;
        display: block;
      }

      .title {
        text-align: center;
        font-size: 20px;
        color: #353535;
        margin-bottom: 20px;
      }

      .sub-title {
        text-align: center;
        color: #888;
        font-size: 18px;
      }

      .isScan {
        .avatar {
          width: 160px;
          height: 160px;
          border-radius: 4px;
          -moz-border-radius: 4px;
          -webkit-border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, .1);
          margin: 85px auto 40px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          font-size: 20px;
          color: #353535;
          margin-bottom: 14px;
          font-weight: 400;
        }

        .sub-title {
          text-align: center;
          color: #000;
          font-size: 16px;
        }

        .action {
          display: block;
          margin: 60px 80px auto;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          line-height: 2.55555556;
          border-radius: 6px;
          color: #000;
          width: 220px;
          border: 1px solid rgba(0, 0, 0, .2);
        }
      }
    }

    .copyright {
      position: absolute;
      bottom: 60px;
      right: 60px;
      color: #d3d3d3;
      font-size: 12px;
    }
  }
</style>
