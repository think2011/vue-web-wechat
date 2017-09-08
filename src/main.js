import Vue from 'vue'
import App from './App'
import store from './store'
import tools from './assets/js/tools'
import router from './router'

window.COOKIES = tools.getCookie()

new Vue({
  el        : '#app',
  store,
  router,
  template  : '<App/>',
  components: {App}
})
