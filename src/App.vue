<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './datastores'
export default {
  store,
  name: 'app'
}
</script>

<style lang="scss">
@import "./assets/css/core/reset";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 30px; /*px*/
  color: #696969;
  height: 100%;
}
html, body {
  height: 100%;
  width: 100%;
}
.el-message-box {
  width: 600px !important;
}
.el-message {
  min-width: 500px !important; /*px*/
  height: 80px !important; /*px*/
  padding-left: 80px !important; /*px*/
  padding-top: 20px !important; /*px*/
  padding-bottom: 20px !important; /*px*/
}
.el-message__img {
  height: 80px !important; /*px*/
  width: 80px !important; /*px*/
}
.el-message__group {
  margin-left: 10px !important;
  height: 40px !important; /*px*/
  line-height: 40px !important; /*px*/
}
.el-message__group p {
  font-size: 28px !important; /*px*/
}
</style>
