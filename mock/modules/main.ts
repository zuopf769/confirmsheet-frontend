import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const testData = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      account: '@phone',
      true_name: '@name',
      created_at: '@datetime',
      role_name: '@name'
    }
  ]
})

export default [
  // 测试接口
  {
    url: '/system/test',
    // headers: {
    //   isToken: false
    // },
    method: 'get',
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        data: testData
      }
    }
  }
] as MockMethod[]
