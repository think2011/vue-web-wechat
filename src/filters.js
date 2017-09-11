import Vue from 'vue'
import moment from 'moment'
import conf from './conf'

const filters = {
  moment(val, format = 'YYYY-MM-DD'){
    return moment(val).format(format)
  },

  isContact(val){
    return !!(val & conf.CONTACTFLAG_CHATCONTACT)
  }
}

// 注册filters
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))


export default filters