import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
      path: '/',
      component: Layout,
      meta: {
        requiresAuth: true // 自定义数据
      },
      children: [
        {
          path: '', // 默认子路由
          name: 'home',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
          meta: {
            requiresAuth: true // 自定义数据
          }
        },
        {
          path: '/role',
          name: 'role',
          component: () => import('@/views/role/index.vue'),
          meta: {
            requiresAuth: true // 自定义数据
          }
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('@/views/menu/index.vue')
        },
        {
          path: '/menu/add',
          name: 'menu-add',
          component: () => import('@/views/menu/add-menu.vue')
        },
        {
          path: '/menu/:id/edit',
          name: 'menu-edit',
          component: () => import('@/views/menu/edit-menu.vue')
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
// 全局前置守卫， 任何页面的访问都要经过这里
// to： 要去哪里
// from：从哪里来
// next： 通行的标志
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(to)

  // // 路由守卫中一定要调用next， 否则页面无法展示
  // next()
  // if (to.path !== 'login') {
  //   //
  // }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) { // 没有登录状态就跳转登录页
      next({
        name: 'login',
        query: { // 通过 URL 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next() // 允许通过
    }
  } else {
    next() // 允许通过
  }
})
export default router
