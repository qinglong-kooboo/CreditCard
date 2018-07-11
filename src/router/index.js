import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreditCard',
      component: resolve => { require(['../views/CreditCard.vue'], resolve) }
    }
  ]
})
