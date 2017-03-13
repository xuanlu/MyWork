<template>
  <div class="submit">
    <div class="score">
      <p class="title">
        <span class="air"></span>
        <span class="text">给我来个评价吧</span>
        <span class="air"></span>  
      </p>
      <div class="stars-wrap">
        <div class="stars">
          <img src="../../assets/images/star_gray.png" v-for="n in 5" @click="chooseStar(n)">
          <div class="stars-active">
            <img src="../../assets/images/star_active.png" v-for="n in starNum" @click="chooseStar(n)">
          </div>
        </div>
      </div>
    </div>
    <div class="input">
      <textarea placeholder="请填写内容，对其他小伙伴帮助很大哦！" v-model="info"></textarea>
      <span class="count">{{count}}/100</span>
    </div>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
  import {evaluate as urlEvaluate} from '../../databus'
  export default {
    data () {
      return {
        info: '',
        count: 0,
        merchantId: null,
        starNum: 0
      }
    },
    watch: {
      info (newVal) {
        this.count = this.info.length
      }
    },
    methods: {
      chooseStar (n) {
        this.starNum = n
      },
      submit () {
        if (!this.starNum) {
          this.$message({
            message: '给商家打个分吧'
          })
          return
        }
        if (!this.info) {
          this.$message({
            message: '给商家写点评价吧'
          })
          return
        }
        if (this.count > 100) {
          this.$message({
            message: '字数太多了'
          })
          return
        }
        let option = {
          params: {
            merchant_id: this.merchantId,
            score: this.starNum,
            user_id: 2,
            info: this.info
          }
        }
        this.$http.jsonp(urlEvaluate.edit, option).then((result) => {
          console.log(result)
        })
      }
    },
    created () {
      this.merchantId = this.$router.currentRoute.params.merchant_id
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
