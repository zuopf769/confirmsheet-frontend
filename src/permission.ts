import router from './router'
import useUserStore from '@/store/user'
import { getToken } from '@/utils/auth'
import { useNProgress } from '@/hooks/useNProgress'

const whiteList = ['/login']

const { start, done } = useNProgress()

router.beforeEach((to, from, next) => {
  start()
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      done()
    } else {
      if (useUserStore().roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        useUserStore()
          .getInfo()
          .then(() => {
            next({ ...to, replace: true })
          })
          .catch((err) => {
            useUserStore()
              .logOut()
              .then(() => {
                next({ path: '/' })
              })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      done()
    }
  }
})

router.afterEach(() => {
  done()
})
