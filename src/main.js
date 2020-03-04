// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  vuex from 'vuex'
import { Button } from 'vant';
import { Cell, CellGroup,Col, Row ,Icon,Switch,Field,DatetimePicker,ActionSheet,
  Picker,Popup,Toast,Checkbox, CheckboxGroup,Search,TreeSelect,Image,
  Collapse, CollapseItem} from 'vant';
// import {Tree} from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css';



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
Vue.use(Picker);
Vue.use(Search)
Vue.use(DatetimePicker);
Vue.use(ActionSheet );
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(TreeSelect);
Vue.use(Image);
Vue.use(Collapse);
Vue.use(CollapseItem);

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
