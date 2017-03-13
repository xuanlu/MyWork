<template>
  <div class="bind">
    <p class="phone"><span class="title">手机号</span><input placeholder="请输入手机号" v-model="phone"/></p>
    <p class="code"><input v-model="code" placeholder="请输入验证码" /><button @click="getCode">获取验证码</button></p>
    <button class="bind-btn" @click="bindPhone">绑定</button>
  </div>
</template>
<script>
  import {num as urlNum} from '../../databus'
  export default {
    data () {
      return {
        phone: null,
        code: null
      }
    },
    methods: {
      getCode () {
        if (!this.phone) {
          this.$message({
            message: '请输入手机号',
            type: 'warning'
          })
          return
        }
        let option = {
          params: {
            phone: this.phone
          }
        }
        this.$http.jsonp(urlNum.verify, option).then((result) => {
          this.$message({
            message: result.data.msg,
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err.data.msg)
        })
      },
      bindPhone () {
        if (!this.phone) {
          this.$message({
            message: '请输入手机号',
            type: 'warning'
          })
          return
        }
        if (!this.code) {
          this.$message({
            message: '请输入验证码',
            type: 'warning'
          })
          return
        }
        let option = {
          params: {
            phone: this.phone,
            code: this.code
          }
        }
        this.$http.jsonp(urlNum.join, option).then((result) => {
          this.$message({
            message: result.data.msg,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 2500)
        }, (err) => {
          this.$message.error(err.data.msg)
        })
      }
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
