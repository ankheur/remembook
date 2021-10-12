import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '../views/Table.vue'
import Version from '../views/Version.vue'
import Sauvegarde from '../views/Sauvegarde.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Table
  },
  {
    path: '/bibliotheque',
    component: Table
  },
  {
    path: '/version',
    component: Version
  },
  {
    path:'/sauvegarde',
    component: Sauvegarde
  },
  {
    path: '*',
    component: Table
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
