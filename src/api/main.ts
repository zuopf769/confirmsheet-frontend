import request from '@/utils/request'

// 测试接口
export const getTest = (data?: object) => {
  return request({
    url: '/system/test',
    headers: {
      isToken: false
    },
    method: 'get',
    data
  })
}
