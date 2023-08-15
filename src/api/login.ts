import request from '@/utils/request'

// 登录方法
// username, password, code, uuid
export function login(username: string, password: string) {
  return request({
    url: '/api/v1/auth/token',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password }
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/api/v1/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}
