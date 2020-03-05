import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import AlarmTaskList from '@/pages/AlarmTaskList'

import AlarmTaskCreate from '@/pages/AlarmTaskCreate'

import PersonSelectOrg from '@/components/PersonSelectOrg'
import TargetSelect from '@/components/TargetSelect'

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
    },
    {
      path: '/personSelect',
      name: 'PersonSelectOrg',
      component: PersonSelectOrg,
      meta: {
        title:'人员选择'
      }
    },
    {
      path: '/targetSelect',
      name: 'TargetSelect',
      component: TargetSelect,
      meta: {
        title:'指标选择'
      }
    },
  ]
})
