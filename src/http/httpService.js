//引入axios
import axios from 'axios'
import Vue from "vue";
//修改原型链，全局使用axios,这样之后可在每个组件的methods中调用$axios命令完成数据请求
import store from '../vuex/store.js'


Vue.prototype.$axios=axios

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://localhost:8091/';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://api.123dailu.com/';
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//定义一个请求拦截器

axios.interceptors.request.use(function(config){

  store.state.isShow=true; //在请求发出之前进行一些操作

  console.log(store.state.isShow);
  return config

})

//定义一个响应拦截器

axios.interceptors.response.use(function(config){

  store.state.isShow=false;//在这里对返回的数据进行处理

  return config

})


export default  axios;

