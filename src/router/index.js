import Vue from 'vue'
import Router from 'vue-router'
import Search from '../views/Search'
import Stores from '../views/Stores'
import Take from '../views/Take'
import Comments from '../views/Comments'
import Submit from '../views/Submit'
import User from '../views/User'
import Orders from '../views/Orders'
import Details from '../views/Details'
import Bind from '../views/Bind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/stores/:type',
      name: 'Stores',
      component: Stores
    },
    {
      path: '/take/:merchant_id',
      name: 'Take',
      component: Take
    },
    {
      path: '/comments/:merchant_id',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/submit/:merchant_id',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/details/:merchant_id',
      name: 'Details',
      component: Details
    },
    {
      path: '/bind',
      name: 'Bind',
      component: Bind
    },
    {
      path: '*',
      redirect: {name: 'Search'}
    }
  ]
})
