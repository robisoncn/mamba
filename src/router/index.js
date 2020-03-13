import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import AlarmTaskList from '@/pages/AlarmTaskList'

import AlarmTaskCreate from '@/pages/AlarmTaskCreate'

import PersonSelectOrg from '@/components/PersonSelectOrg'
import TargetSelect from '@/components/TargetSelect'
import store from '../vuex/store'
import httpService from '../http/httpService'
import MiaOrgStaffSelecter from '@/components/MiaOrgStaffSelecter'

Vue.use(Router)

const  router =   new Router({
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
    {
      path: '/miaOrgStaffSelecter',
      name: 'MiaOrgStaffSelecter',
      component: MiaOrgStaffSelecter,
      meta: {
        title:'人员选择'
      }
    },
  ]
})

router.beforeEach((to,from,next)=>{


  //拦截设置title
  if(to.meta.title){
    document.title=to.meta.title
  }
  httpService.post("api/core/auth!queryCurrentUser").then((res)=>{
    let data = res.data.data;
    if(data != undefined){
      store.state.staffid = data.id;
      store.state.staffname = data.account;
      store.state.staffFullName = data.username;
      store.state.isAuthPass = true;
    }
  }).catch(error=>{

    console.log(error);
  })

  console.log('AAAAAAAAAAAA');

  next()
})

export default  router;
