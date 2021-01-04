import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from "./router.js"
import BaiduMap from 'vue-baidu-map';  
//import echarts from 'echarts' 
var echarts = require('echarts');//echarts5使用common.js方式引入
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'YdKO6iXNBqSwUWwEb4AT7eKAfG7EZi1Cm'
})
//Vue.use(echarts)
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
