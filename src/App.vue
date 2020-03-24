<template>
  <div id="app">
    <div class="title">{{this.$router.history.current.meta.title}}</div>
    <router-view/>
  </div>
</template>

<script>
  // import wx from 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
  import httpService from './http/httpService'

export default {
  name: 'App',
  created () {
      httpService.get('/api/imia/wechat/getConfig').then(data=>{
        // beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: '', // 必填，企业微信的corpID
        //   timestamp: , // 必填，生成签名的时间戳
        // nonceStr: '', // 必填，生成签名的随机串
        //   signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
        //   jsApiList: [] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        let appId = data.data.appId;
        let timestamp = data.data.timestamp;
        let nonceStr = data.data.nonceStr;
        let signature = data.data.signature;
        wx.config({
          beta: true,
          debug: true,
          appId:appId,
          timestamp:timestamp,
          nonceStr:nonceStr,
          signature:signature,
          jsApiList:['closeWindow']


        })

      }).catch();
  }
}
</script>

<style>
#app {
  background: #ffffff;
  height: 100vh;
}
.title{
  min-height: 40px;
  text-align: center;
  line-height: 40px;
  background: cornflowerblue;
  color: #ffffff;
  font-size: larger;
}

.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 15px;
  line-height: 25px;
  background-color: #fff;
}


.van-button--normal {
  padding: 0 15px;
  font-size: 16px;
}

</style>
