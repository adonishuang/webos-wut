// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// 引入路由
import router from './router';
import './assets/icon/iconfont.css'
//

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false;

// 使用element UI
Vue.use(ElementUI);

//
import axios from 'axios'

import VueAxios from 'vue-axios'
Vue.use( VueAxios , axios)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})
