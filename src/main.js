import Vue from 'vue'
import App from './App.vue'

import Vuetify from 'vuetify'
import VueLocalStorage from 'vue-ls'
import VueRouter from 'vue-router'

import {routes} from './routes'

Vue.use(Vuetify)
Vue.use(VueLocalStorage)
Vue.use(VueRouter)

export const eventBus = new Vue()

const router = new VueRouter({
  routes,
  mode: 'history'
})

const vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
