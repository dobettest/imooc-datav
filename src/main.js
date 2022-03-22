import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import * as echarts from 'echarts'
import VueEcharts from 'vue-echarts'
import './style/index.css'
import request from './utils/request'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$request = request
Vue.component('v-chart', VueEcharts)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
