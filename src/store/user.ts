import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import router from '@/router'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    roles: <any>[], // 角色
    name: '', // 用户昵称
    userId: '' // 用户id
  }),
  getters: {
    getName: (state) => state.name,
    getUserId: (state) => state.userId
  },
  actions: {
    // 登录
    login(userInfo: any) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise<void>((resolve, reject) => {
        login(username, password)
          .then((res: any) => {
            const data = res.data
            setToken(data.accessToken)
            this.token = data.accessToken
            resolve()
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise<void>((resolve, reject) => {
        getInfo()
          .then((res: any) => {
            this.name = res.data.nickname
            this.userId = res.data.uid
            // console.log(res.data.roles)
            if (res.data.roles && res.data.roles.length > 0) {
              this.roles = res.data.roles
            } else {
              ElMessage.warning('当前用户没有角色,请先配置角色权限')
              this.logOut().then(() => {
                router.push({ path: '/' })
                // location.href = '/index'
              })
              // this.roles = [{ code: 'noAuth', id: '', name: '无权限' }]
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise<void>((resolve, reject) => {
        // logout()
        //   .then(() => {
        //     this.token = ''
        //     this.roles = []
        //     removeToken()
        //     resolve()
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    }
  }
})

export default useUserStore
