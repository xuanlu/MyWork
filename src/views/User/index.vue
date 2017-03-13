<template>
  <div class="user">
    <div class="info">
      <div class="img-wrap">
        <img :src="user.avatar_url">
      </div>
      <div class="text-wrap">
        <p class="name">{{user.nick_name}}</p>
        <p class="id">{{user.uid}}</p>
      </div>
    </div>
    <div class="lists">
      <p class="list" @click="goOrders">我的排号单<span class="num">{{user.count}}</span></p>
    </div>
  </div>
</template>
<script>
  import {num as urlNum} from '../../databus'
  export default {
    data () {
      return {
        user: {}
      }
    },
    methods: {
      goOrders () {
        this.$router.push('/orders')
      }
    },
    created () {
      this.$http.jsonp(urlNum.user).then((result) => {
        this.user = result.data.data
      })
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
