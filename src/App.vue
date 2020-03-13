<template>
  <div id="app">
    <div class="title">{{this.$router.history.current.meta.title}}</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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

</style>
