<template>
  <div class="hello">
    {{msg}}
    <van-button @click="testClick" >TEST</van-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    testClick (){
      console.log('testClicked!');
      console.log(this.$store.state.staffFullName);
      wx.closeWindow();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
