import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import AlarmTaskList from '@/pages/AlarmTaskList'

import AlarmTaskCreate from '@/pages/AlarmTaskCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/alarmTaskList',
      name: 'AlarmTaskList',
      component: AlarmTaskList,
      meta: {
        title:'提醒列表'
      }
    },
    {
      path: '/alarmTaskCreate',
        name: 'AlarmTaskCreate',
      component: AlarmTaskCreate,
      meta: {
      title:'创建提醒'
    }
    }
  ]
})
