import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue')
  },
  {
    path: '/bibliotheque',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue')
  },
  {
    path: '/version',
    component: () => import(/* webpackChunkName: "about" */ '../views/Version.vue')
  },
  {
    path:'/sauvegarde',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sauvegarde.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
