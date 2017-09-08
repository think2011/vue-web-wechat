export default {
  scriptLoader(src, params) {
    let _params = this.param({_: Date.now(), ...params})

    return new Promise((resolve, reject) => {
      const script   = document.createElement('script')
      script.onload  = resolve
      script.onerror = reject
      script.src     = src + _params
      document.head.appendChild(script)
    })
  },

  param(obj){
    return '?' + Object.keys(obj).reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a
      }, []).join('&')
  },

  getCookie(){
    return document.cookie.split('; ').reduce((cur, next) => {
      const [k, v] = next.split('=')

      cur[k] = v
      return cur
    }, {})
  }
}