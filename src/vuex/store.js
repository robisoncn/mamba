import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export const store = new Vuex.Store({

  state:{
    isShow:true,
    testStr:String,
    staffid:String,
    staffname:String,
    staffFullName:String,
    isAuthPass:false
  }

})

export default store;
