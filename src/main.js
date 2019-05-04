import Vue from 'vue'
import App from './App.vue'
import routes from './router/index'

import './assets/styles/reset.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: routes
}).$mount('#app')
