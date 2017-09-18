import Vue from 'vue'
import App from './App.vue'

import Vuetify from 'vuetify'
import VueLocalStorage from 'vue-ls'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import {routes} from './routes'

Vue.use(Vuetify)
Vue.use(VueLocalStorage)
Vue.use(VueRouter)
Vue.use(VueI18n)

export const eventBus = new Vue()

const router = new VueRouter({
  routes,
  mode: 'history'
})

const i18n = new VueI18n({
  locale: navigator.language || navigator.userLanguage,
  fallbackLocale: 'en'
})

const vm = new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
