// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import element from 'element-ui'
import store from 'store'
import 'element-ui/lib/theme-default/index.css'

Vue.use(resource)
Vue.use(element)

Vue.http.interceptors.push((request, next) => {
  let id = store.get('open_id') || 12
  if (id) {
    request.params.open_id = id
  }
  next((response) => {
    if (!response.ok || response.data.code < 0) {
      response.ok = false
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
