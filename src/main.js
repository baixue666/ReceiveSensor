import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from "./router.js"
import BaiduMap from 'vue-baidu-map';
//import echarts from 'echarts' 
var echarts = require('echarts'); //echarts5使用common.js方式引入
import axios from 'axios'
Vue.use(ElementUI)
Vue.use(BaiduMap, {
        ak: 'YdKO6iXNBqSwUWwEb4AT7eKAfG7EZi1Cm'
    })
    //Vue.use(echarts)
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios
new Vue({
    router,
    data: function() {
        return {
            displayLogin: false,
            positionMenu: [],
            indexPositionMenu: [],
            activeIndex: "1"
        }
    },
    methods: {
        setCookie(cname, cvalue, exdays) {  
            var  cookies  =  cname  +  "="  +  cvalue  +  ";path=/";    
            if  (exdays)  {        
                var  d  =  new  Date();        
                d.setTime(d.getTime()  +  (exdays  *  24  *  60  *  60  *  1000));        
                cookies  +=  ";expires="  +  d.toGMTString();    
            }    
            document.cookie  =  cookies;
        },
        getCookie(cname) {    
            var  name  =  cname  +  "=";    
            var  ca  =  document.cookie.split(';');    
            for  (var  i  =  0;  i  <  ca.length;  i++)  {        
                var  c  =  ca[i].trim();        
                if  (c.indexOf(name)  ==  0)  {            
                    return  c.substring(name.length,  c.length);        
                }    
            }    
            return  "";
        }
    },
    render: h => h(App)
}).$mount("#app")