import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
