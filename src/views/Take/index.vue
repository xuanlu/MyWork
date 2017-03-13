<template>
  <div class="take">
    <div class="head">
      <div class="pause" v-if="status == 0"><img src="../../assets/images/knife_active.png" />暂停取号</div>
      <div class="wait" v-if="status != 0">
        <div class="wait-head">
          <p>餐桌类型</p>
          <p>等待桌数</p>
          <p>预计等待</p>
        </div>
        <ul class="wait-body">
          <li :class="{'gray': index%2 == 0, 'active': tableId == item.id}" v-for="(item, index) in storeInfo.order" @click="chooseTable(item.id)">
            <p class="p-left">
              <span class="left-1">{{item.title}}</span>
              <span class="left-2">1-2人</span>
            </p>
            <p class="p-mid">
              <span class="mid-1">{{item.num}}</span>
              <span class="mid-2">桌</span>
            </p>
            <p class="p-right">
              <span class="right-1">{{item.wait_time}}</span>
              <span class="right-2">分钟</span>
            </p>
          </li>
        </ul>
        <div class="wait-result" v-if="status == 1">
          <img src="../../assets/images/knife_active.png">
          <div class="result-text">
            <p class="top">本店现在无需排队</p>
            <p class="bottom">快带上小伙伴来吧</p>
          </div>
        </div>
        <div class="wait-result2" v-if="status == 2">
          <div>
            <p class="top">{{storeInfo.range}}Km</p>
            <p class="bottom">当前距离</p>
          </div>
          <div>
            <p class="top">3Km</p>
            <p class="bottom">限制距离</p>
          </div>
          <div class="button">
            <button @click="takeNum">取 号</button>
          </div>
        </div>
        <div class="cancel" v-if="status == 3">
          <div class="wait-result3">
            <div>
              <p class="top">单号</p>
              <p class="bottom code">{{waitInfo.sort_number}}</p>
            </div>
            <div>
              <p class="top">还需等待</p>
              <p class="bottom"><span class="num">{{waitInfo.num}}</span> 桌</p>
            </div>
            <div>
              <p class="top">预估等待</p>
              <p class="bottom">{{waitInfo.time}}分钟</p>
            </div>
            <div class="button">
              <button @click="cancel">取消排队</button>
            </div>
          </div>
          <div class="tips">
            <p>听到叫号请到迎宾台，过号五桌以上需要重新取号，预估等待时间仅供参考</p>
            <p>若取号成功后行程有变，到号之前取消排队可退款。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="info" v-if="status != 3">
        <div class="head">
          <p class="title">{{storeInfo.shop_name}}</p>
          <p class="score">特色餐厅<span><img src="../../assets/images/heart_active.png" />{{storeInfo.avg_eva}}分</span></p>
        </div>
        <div class="content">
          <div class="content-main">
            <p><img src="../../assets/images/address_active.png" />{{storeInfo.address}}</p>
            <p class="second-p"><img src="../../assets/images/time_active.png" />营业时间：{{storeInfo.business_time}}</p>
          </div>
          <div class="img-wrap">
            <a :href="'tel:' + storeInfo.shop_tel">
            <img src="../../assets/images/phone_active.png">
            </a>
          </div>
        </div>
        <div class="discount">
          <p class="discount-title">优惠信息</p>
          <p class="discount-info">本店暂无优惠</p>
        </div>
      </div>
      <div class="comment" v-if="status != 3">
        <div class="head" @click="goComments">评论</div>
        <div class="content">
          <p class="user-name">{{eva.user_name}}</p>
          <p class="score">
            <span class="l">
              <img src="../../assets/images/star_active.png" v-for="n in parseInt(eva.score)||0">
            </span>
            <span class="r">{{eva.add_time | formatDate}}</span>
          </p>
          <p class="text">{{eva.info}}</p>
        </div>
      </div>
    </div>
    <div class="mall" v-if="status == 3">
      <p><img src="../../assets/images/phone.png" />{{storeInfo.shop_tel}}</p>
      <p><img src="../../assets/images/address.png" />{{storeInfo.address}}</p>
      <p><img src="../../assets/images/time.png" />营业时间：{{storeInfo.business_time}}</p>
    </div>
  </div>
</template>
<script>
  import {shop as urlShop, num as urlNum} from '../../databus'
  // import {locate} from '../../utils'
  import {formatDate} from '../../filters'
  export default {
    data () {
      return {
        status: 2,
        storeInfo: {},
        waitInfo: {},
        eva: {},
        lat: null,
        lng: null,
        tableId: null,
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
      goComments () {
        this.$router.push('/comments/' + this.merchantId)
      },
      chooseTable (id) {
        this.tableId = id
        console.log(id)
      },
      takeNum () {
        let option = {
          params: {
            merchant_id: this.merchantId,
            num: 5
          }
        }
        this.$http.jsonp(urlNum.take, option).then((result) => {
          console.log(result)
          let code = result.data.data.code
          if (code === -1) {
            this.$message({
              message: result.data.data.msg
            })
          }
          if (code === -1) {
            this.$confirm('绑定手机后才能取号，是否先去绑定手机号码?', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.$router.push('/bind')
            }).catch(() => {})
          }
        })
      },
      cancel () {
        let option = {
          params: {}
        }
        this.$http.jsonp(urlNum.cancel, option).then((result) => {
          console.log(result)
          this.$message({
            message: '取消成功',
            type: 'success'
          })
        })
      }
    },
    created () {
      this.merchantId = this.$router.currentRoute.params.merchant_id
/*      locate((position) => {
        let option = {
          params: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            merchant_id: merchantId
          }
        }
        this.$http.jsonp(urlShop.detail, option).then((result) => {
          this.storeInfo = result.data.data
          this.eva = result.data.data.eva
        })
      }, (err) => {
        console.log(err)
      })  */
      let option = {
        params: {
          merchant_id: this.merchantId
        }
      }
      this.$http.jsonp(urlShop.detail, option).then((result) => {
        this.storeInfo = result.data.data
        this.eva = result.data.data.eva
      })
      this.$http.jsonp(urlNum.query, option).then((result) => {
        this.waitInfo = result.data.data
      })
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
