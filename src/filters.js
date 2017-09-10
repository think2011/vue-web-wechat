import Vue from 'vue'
import moment from 'moment'

const filters = {
  moment(val, format = 'YYYY-MM-DD'){
    return moment(val).format(format)
  }
}

// 注册filters
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))

