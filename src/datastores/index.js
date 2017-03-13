import Vue from 'vue'
import Vuex from 'vuex'
import keyword from './modules/keyword'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    keyword
  }
})
