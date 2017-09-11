import http from 'axios'
import tools from '../assets/js/tools'

window.QRLogin = window.QRLogin || {}

export default {
  async fetchUuid() {
    await tools.scriptLoader('/api/login/jslogin', {
      appid       : 'wx782c26e4c19acffb',
      redirect_uri: 'https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage',
      fun         : 'new',
      lang        : 'zh_CN'
    })
    return window.QRLogin.uuid
  },

  async fetchLoginStatus(params){
    await tools.scriptLoader('/api/login/cgi-bin/mmwebwx-bin/login', {
      loginicon: true,
      ...params,
    })
    return {
      code        : window.code,
      userAvatar  : window.userAvatar,
      redirect_uri: window.redirect_uri && window.redirect_uri.replace('https://wx2.qq.com', location.origin + '/api/wx2')
    }
  },

  async autoLogin(url) {
    return http({url: url + '&fun=new&version=v2&lang=zh_CN'})
      .then((res) => {
        let xml = res.data

        window.COOKIES = tools.getCookie()
        return {
          Sid        : window.COOKIES.wxsid,
          Uin        : window.COOKIES.wxuin,
          Skey       : decodeURIComponent(/<skey>([^]+)<\/skey>/g.exec(xml)[1]),
          pass_ticket: decodeURIComponent(/<pass_ticket>([^]+)<\/pass_ticket>/g.exec(xml)[1]),
          DeviceID   : `e${Date.now()}`
        }
      })
  },

  async initPage(params, data) {
    return http({
      url   : '/api/wx2/cgi-bin/mmwebwx-bin/webwxinit',
      method: 'post',
      params: {
        r   : -Date.now(),
        lang: 'zh_CN',
        ...params
      },
      data
    })
      .then((res) => {
        return res.data
      })
  },

  async getRemainContacts(params) {
    return http({
      url   : '/api/wx2/cgi-bin/mmwebwx-bin/webwxgetcontact',
      method: 'get',
      params: {
        r   : Date.now(),
        lang: 'zh_CN',
        seq:0,
        ...params
      }
    })
      .then((res) => {
        return res.data
      })
  }
}