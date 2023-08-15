import { getToken } from '@/utils/auth'
import axios from 'axios'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import useUserStore from '@/store/user'
// import { Session } from '@/utils/storage'

//
const errorCode: object = {
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  500: '服务器错误，请联系管理员',
  default: '系统未知错误，请反馈给管理员'
}

// 配置新建一个 axios 实例
const service = axios.create({
  // .env.localmock VITE_APP_BASE_API = '/dev-api', 每个mock接口都需要添加'/dev-api/xxx'
  // baseURL: import.meta.env.VITE_APP_BASE_API as any,
  // .env.localmock VITE_APP_BASE_API = '/dev-api', 每个mock接口不需要添加'/dev-api'
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 50,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === false
    // 在发送请求之前做些什么 token
    // if (getToken() && !isToken) {
    //   ;(<any>config.headers).common['Authorization'] = 'Bearer ' + getToken()
    // }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 0
    // 获取错误信息
    const msg = res.data.msg || errorCode[code] || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    // 403 无权限，token失效
    if (code === 401 || code === 403) {
      ElMessageBox.confirm('当前账号登录状态已过期，需重新登录', {
        confirmButtonText: '确定',
        showCancelButton: false,
        showClose: false,
        buttonSize: 'default',
        customClass: 'custom-confirm-message-box'
      })
        .then(async () => {
          useUserStore()
            .logOut()
            .then(() => {
              location.href = '/'
              // location.href = '/index'
            })
        })
        .catch(() => {})
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      ElMessage({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      // code !== 0
      ElNotification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    const { message } = error
    const { response } = error
    console.log(message, response)

    switch (response.status) {
      case 401:
      case 403:
        ElMessageBox.confirm('当前账号登录状态已过期，需重新登录', {
          confirmButtonText: '确定',
          showCancelButton: false,
          showClose: false,
          buttonSize: 'default',
          customClass: 'custom-confirm-message-box'
        })
          .then(async () => {
            useUserStore()
              .logOut()
              .then(() => {
                location.href = '/'
                // location.href = '/index'
              })
          })
          .catch(() => {})
        break
      case 400:
        ElMessage({
          message: response?.data?.msg || message,
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 404:
      case 500:
        console.log(errorCode[response.status])

        ElMessage({
          message: errorCode[response.status],
          type: 'error',
          duration: 5 * 1000
        })
        break
      default:
        ElMessage({
          message: message,
          type: 'error',
          duration: 5 * 1000
        })
        break
    }

    return Promise.reject(error)
  }
)

// 导出 axios 实例
export default service
