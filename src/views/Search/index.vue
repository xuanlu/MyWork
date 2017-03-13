<template>
  <div class="search">
    <div class="search-content">
      <input type="text" v-model="word" class="search-input" placeholder="想吃哪家餐厅就搜一下" />
      <button class="search-btn" @click="search">搜 索</button>
      <ul class="search-recommend">
        <li @click="goStores(1)">附近餐厅</li>
        <li @click="goStores(2)">热门品牌</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getKeyWord} from '../../datastores/getters/keyword'
  import {saveKeyWord} from '../../datastores/actions/keyword'
  export default {
    data () {
      return {
        word: ''
      }
    },
    methods: {
      search () {
        if (!this.word) {
          return
        }
        this.saveKeyWord(this.word)
        this.goStores(0)
      },
      goStores (type) {
        this.$router.push('/stores/' + type)
      }
    },
    vuex: {
      actions: {
        saveKeyWord
      },
      getters: {
        getKeyWord
      }
    },
    created () {
      this.word = this.getKeyWord || ''
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
