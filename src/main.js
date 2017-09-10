import Vue from 'vue'
import App from './App'
import store from './store'
import tools from './assets/js/tools'
import router from './router'
import Vuebar from 'vuebar';

require('./filters')

window.COOKIES = tools.getCookie()
Vue.use(Vuebar)

new Vue({
  el        : '#app',
  store,
  router,
  template  : '<App/>',
  components: {App}
})
