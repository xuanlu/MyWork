<template>
  <div class="orders-wrap">
    <div class="orders">
      <div class="order" v-for="order in orderLists" @click="goDetail(order.merchant_id)">
        <p class="head">{{order.shop_name}}</p>
        <div class="info">
          <div class="info-l">
            <p><span class="span-l">{{order.add_time | formatDate}}</span><span>已取号</span></p>
            <p><span class="span-l">预估等待</span><span>{{order.time}}分钟</span></p>
            <p><span class="span-l">还需等待</span><span>{{order.num}}桌</span></p>
          </div>
          <div class="info-r">
            <p class="num">{{order.sort_number}}</p>
            <p class="type">{{order.title}}</p>
          </div>
        </div>
        <div class="tips">
          <span class="pic">排队</span>
          <p class="tips-text">听到叫号请到迎宾台，过号五桌以上需要重新取号</p>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
  import {num as urlNum} from '../../databus'
  import {formatDate} from '../../filters'
  export default {
    data () {
      return {
        orderLists: []
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(Number(time) * 1000)
        return formatDate(date)
      }
    },
    methods: {
      goDetail (id) {
        this.$router.push('/details/' + id)
      }
    },
    created () {
      let option = {
        params: {
          user_id: 1
        }
      }
      this.$http.jsonp(urlNum.order, option).then((result) => {
        console.log(result.data.data.order)
        this.orderLists = result.data.data.order
      })
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
