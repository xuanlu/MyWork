<template>
  <div class="comments-wrap">
    <div class="comments">
      <div class="content" v-for="comment in commentList">
        <p class="username">{{comment.user_name}}</p>
        <p class="score">
          <span class="l"><img src="../../assets/images/star_active.png" v-for="n in Number(comment.score)||0"></span>
          <span class="r">{{comment.add_time | formatDate}}</span>
        </p>
        <p class="text">{{comment.info}}</p>
      </div>
    </div>
    <div class="button-wrap">
      <button @click="goSubmit">我要评论</button>
    </div>
  </div>
</template>
<script>
  import {evaluate as urlEvaluate} from '../../databus'
  import {formatDate} from '../../filters'
  export default {
    data () {
      return {
        commentList: [],
        merchantId: null
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(Number(time) * 1000)
        return formatDate(date)
      }
    },
    methods: {
      goSubmit () {
        this.$router.push('/submit/' + this.merchantId)
      }
    },
    created () {
      this.merchantId = this.$router.currentRoute.params.merchant_id
      let option = {
        params: {
          merchant_id: this.merchantId
        }
      }
      this.$http.jsonp(urlEvaluate.lists, option).then((result) => {
        this.commentList = result.data.data
      })
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
