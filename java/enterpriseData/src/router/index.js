// 导入组件
import Vue from 'vue';
import Router from 'vue-router';

import index from '@/views/index';
import Model from '@/views/system/model'
import Login from '@/views/login'

/**
 * 系统管理
 */
// 用户管理
import user from '@/views/system/user';


// 启用路由
Vue.use(Router);

// 导出路由
export default new Router({
  routes: [{
    path: '/',
    component: Model,
  }, {
    path: '/login',
    name: '登陆',
    component: Login,
    meta: {
      requireAuth: true
    },
  }, {
    path: '/index',
    name: '首页',
    component: index,
    iconCls: 'el-icon-tickets',
    children: [{
      path: '/system/user',
      name: '用户管理',
      component: user,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/system/model',
      name: '企业模型',
      component: Model,
      meta: {
        requireAuth: true
      }
    }]
  }]
})
