import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import sheetRoutes from './sheetRouter'

// 公共路由
export let constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/event-bus/app/integrate'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/401',
    name: 'error',
    component: () => import('@/views/error/401.vue')
  },
  {
    path: '/404',
    name: 'NoFound',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

// 事件总线路由
constantRoutes = constantRoutes.concat(sheetRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
