import Vue from 'vue'
Vue.config.devtools = true
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
