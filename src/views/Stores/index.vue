<template>
  <div class="stores">
    <div class="stores-h">
      <div class="h-left" @click="clickLeft" :class="{'active' : leftActive}">
        <img src="../../assets/images/address_active.png">
        <span class="text">区域</span>
      </div>
      <div class="h-right">
        <img src="../../assets/images/print_active.png">
        <span class="text">取号</span>
      </div>
    </div>
    <div class="stores-body">
      <ul class="lists">
        <li class="list-item" @click="goTake(list.merchant_id)" v-for="list in storeLists">
          <div class="img-wrap">
            <img :src="list.logo_path">
          </div>
          <div class="info">
            <p class="name">{{list.shop_name}}</p>
            <div class="comment">
              <div class="comment-l">
                <div class="comment-l-t">
                  <p class="fl">特色餐厅</p>
                  <p class="fr orange"><img class="heart" src="../../assets/images/halfheart_active.png" />{{list.score || '--'}}分</p>
                </div>
                <div class="comment-l-b">
                  <p class="fl">{{parseInt(list.average_consume) || '--'}}/人</p>
                  <p class="fr">{{list.range.toFixed(2) || '--'}}Km</p>
                </div>
              </div>
              <div class="comment-r">
                <div class="comment-r-l orange">{{list.Num || '--'}}</div>
                <div class="comment-r-r">
                  <p>桌</p>
                  <p>在等待</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <popup :show="popupVisible" @close="closePopup">
        <div class="select-wrapper">
          <div class="left">
            <ul>
              <li v-for="item in districtList" :class="{'active' : districtCode == item.id}" @click="changeArea(item)">{{item.region_title}}</li>
            </ul>
          </div>
<!--           <div class="right">
            <ul>
              <li v-for="(n, index) in 5" :class="{'active' : shopIndex == index}">asdf</li>
            </ul>
          </div> -->
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import Popup from '../../components/Popup'
  // import {locate} from '../../utils'
  import {getKeyWord} from '../../datastores/getters/keyword'
  import {shop as urlShop} from '../../databus'
  export default {
    data () {
      return {
        leftActive: false,
        popupVisible: false,
        areaIndex: 0,
        shopIndex: 1,
        storeLists: [],
        lat: null,
        lng: null,
        districtList: [],
        districtCode: null
      }
    },
    methods: {
      clickLeft () {
        this.popupVisible = !this.popupVisible
        this.leftActive = !this.leftActive
      },
      closePopup () {
        this.popupVisible = false
        this.leftActive = false
      },
      changeArea (item) {
        this.districtCode = item.id
        let option = {
          params: {
            lat: 22.54,
            lng: 113.96,
            region_path: item.path
          }
        }
        this.$http.jsonp(urlShop.lists, option).then((result) => {
          this.storeLists = result.data.data
        })
        this.popupVisible = false
        this.leftActive = false
      },
      goTake (id) {
        this.$router.push('/take/' + id)
      }
    },
    created () {
      let type = Number(this.$router.currentRoute.params.type)
/*      locate((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        if (type === 0) {
          let keyWord = this.getKeyWord
          let option = {
            params: {
              shop_name: keyWord,
              lat: this.lat,
              lng: this.lng
            }
          }
          this.$http.jsonp(urlShop.lists, option).then((result) => {
            this.storeLists = result.data.data
          })
        }
        if (type === 1) {
          let option = {
            params: {
              lat: this.lat,
              lng: this.lng
            }
          }
          this.$http.jsonp(urlShop.lists, option).then((result) => {
            this.storeLists = result.data.data
          })
        }
        if (type === 2) {
          let option = {
            params: {
              lat: this.lat,
              lng: this.lng
            }
          }
          this.$http.jsonp(urlShop.brand, option).then((result) => {
            this.storeLists = result.data.data
          })
        }
        let option = {
          params: {
            region_level: 3,
            parent: 524
          }
        }
        this.$http.jsonp(urlShop.select, option).then((result) => {
          console.log(result)
          this.districtList = result.data.data.rows
          this.districtCode = this.districtList[0].id
        })
      }, (err) => {
        console.log(err)
      })  */
      if (type === 0) {
        let keyWord = this.getKeyWord
        let option = {
          params: {
            shop_name: keyWord,
            lat: 22,
            lng: 113
          }
        }
        this.$http.jsonp(urlShop.lists, option).then((result) => {
          this.storeLists = result.data.data
        })
      }
      if (type === 1) {
        let option = {
          params: {
            lat: this.lat,
            lng: this.lng
          }
        }
        this.$http.jsonp(urlShop.lists, option).then((result) => {
          this.storeLists = result.data.data
        })
      }
      if (type === 2) {
        let option = {
          params: {
            lat: this.lat,
            lng: this.lng
          }
        }
        this.$http.jsonp(urlShop.brand, option).then((result) => {
          this.storeLists = result.data.data
        })
      }
      let option = {
        params: {
          region_level: 3,
          parent: 524
        }
      }
      this.$http.jsonp(urlShop.select, option).then((result) => {
        console.log(result)
        this.districtList = result.data.data.rows
        this.districtCode = this.districtList[0].id
      })
    },
    components: {
      Popup
    },
    vuex: {
      getters: {
        getKeyWord
      }
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
