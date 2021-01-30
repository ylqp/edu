import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
      children: [
        {
          path: '/role',
          name: 'role',
          component: () => import('@/views/role/index.vue')
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('@/views/menu/index.vue')
        },
        {
          path: '/resource',
          name: 'resource',
          component: () => import('@/views/resource/index.vue')
        },
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue')
        },
        {
          path: '/advert',
          name: 'advert',
          component: () => import('@/views/advert/index.vue')
        },
        {
          path: '/advert-space',
          name: 'advert-space',
          component: () => import('@/views/advert-space/index.vue')
        }
      ]
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
