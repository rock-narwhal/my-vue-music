import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import VueLazyload from "vue-lazyload";

import '@/element'

import '@/assets/css/global.css'
import '@/assets/css/my-element.css'
import '@/assets/css/btn.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/icons'

Vue.config.productionTip = false

Vue.use(VueLazyload,{
  preLoad: 1.9,
  error: require('@/assets/img/error.jpg'),
  loading: require('@/assets/img/loading.gif'),
  attempt: 3
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
