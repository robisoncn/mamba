// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  vuex from 'vuex'
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Col, Row } from 'vant';
import { Icon } from 'vant';
import { Switch } from 'vant';

import { Field } from 'vant';
import { DatetimePicker } from 'vant';
import { ActionSheet } from 'vant';


Vue.config.productionTip = false

Vue.use(vuex);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Switch);
Vue.use(Field);

Vue.use(DatetimePicker);
Vue.use(ActionSheet);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next()
})
