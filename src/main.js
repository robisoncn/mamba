// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  Vuex from 'vuex'
import { Cell, CellGroup,Col, Row ,Icon,Switch,Field,DatetimePicker,ActionSheet,
  Picker,Popup,Toast,Checkbox, CheckboxGroup,Search,TreeSelect,Image,
  Collapse, CollapseItem,SwipeCell,Button } from 'vant';
import {Avatar,Badge,Icon as Aincon} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
//引入axios
import Axios from 'axios'
//引入ivew，用于load
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './vuex/store'



//修改原型链，全局使用axios,这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios=Axios


Vue.config.productionTip = false

Vue.use(iView);
Vue.use(Vuex);
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
Vue.use(SwipeCell);
Vue.use(Avatar);
Vue.use(Badge);
Vue.use(Aincon);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})




