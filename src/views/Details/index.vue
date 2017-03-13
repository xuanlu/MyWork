<template>
  <div class="details">
    <div class="head">
      <p class="status" v-if="status == 0"><img src="../../assets/images/ok_active.png">已取号</p>
      <p class="status" v-if="status == -1"><img src="../../assets/images/close.png">已过号</p>
      <p class="status" v-if="status == 1"><img src="../../assets/images/ok_active.png">就餐中</p>
      <p class="status" v-if="status == -2"><img src="../../assets/images/close.png">已取消</p>
      <div class="tips">
        <p>若遇到任何问题或需开具发票（200元起开），请您点击右上角按钮联系美味不用等官方客服</p>
      </div>
    </div>
    <div class="order">
      <p class="head">{{orderInfo.shop_name}}</p>
      <div class="info">
        <div class="info-l">
          <p><span class="span-l">取号时间</span><span>{{orderInfo.add_time | formatDate}}</span></p>
          <p><span class="span-l">还需等待</span><span>{{orderInfo.num}}桌</span></p>
          <p><span class="span-l">预估等待</span><span>{{orderInfo.time}}分钟</span></p>
          <p><span class="span-l">已等待</span><span>{{((now - orderInfo.add_time * 1000)/1000/60).toFixed()}}分钟</span></p>
        </div>
        <div class="info-r">
          <p class="num">{{orderInfo.sort_number}}</p>
          <p class="type">{{orderInfo.title}}</p>
        </div>
      </div>
      <div class="tips">
        <p class="tips-text">听到叫号请到迎宾台，过号五桌以上需要重新取号</p>
      </div>
    </div>
    <div class="bottom">
      <p class="list"><img src="../../assets/images/address.png"/>{{orderInfo.address}}</p>
    </div>
    <div class="btn">
      <button v-if="status == 0" @click="cancelOrder">取消排队</button>
      <button v-if="status != 0" @click="deleteOrder">删除号单</button>
    </div>
  </div>
</template>
<script>
  import {num as urlNum} from '../../databus'
  import {formatDate} from '../../filters'
  export default {
    data () {
      return {
        status: null,
        merchantId: null,
        orderInfo: {},
        now: new Date().getTime()
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(Number(time) * 1000)
        return formatDate(date)
      }
    },
    methods: {
      cancelOrder () {
        let option = {
          params: {
            id: this.orderInfo.id
          }
        }
        this.$confirm('是否确定取消排队?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http.jsonp(urlNum.cancel, option).then((result) => {
            console.log(result)
            this.status = -2
            this.$message({
              message: '取消排队成功',
              type: 'success'
            })
          })
        }).catch((err) => {
          this.$message({
            message: err.data.msg,
            type: 'warning'
          })
        })
      },
      deleteOrder () {
        this.$confirm('是否确定删除号单?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
        }).catch((err) => {
          this.$message({
            message: err.data.msg,
            type: 'warning'
          })
        })
      }
    },
    created () {
      this.merchantId = this.$router.currentRoute.params.merchant_id
      let option = {
        params: {
          merchant_id: this.merchantId,
          user_id: 1
        }
      }
      this.$http.jsonp(urlNum.query, option).then((result) => {
        this.orderInfo = result.data.data
        this.status = result.data.data.status
      })
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
