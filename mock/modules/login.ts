import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const getInfoData = {
  code: 0,
  data: {
    createdDate: '2022-11-28T12:05:33',
    nickname: '管理员',
    roles: [
      {
        code: 'admin',
        id: '1408371790551449600',
        name: '管理员'
      }
    ],
    tid: '1408371790551440000',
    uid: '1302711393567965184',
    username: 'sadmin'
  },
  msg: 'ok'
}

export default [
  // 登录方法
  {
    // url: '/api/v1/auth/token',
    url: /\/api\/v1\/auth\/token/,
    headers: {
      isToken: false
    },
    method: 'post',
    response: (res: any) => {
      // console.log('res:', res.url)
      return {
        code: 0,
        msg: '操作成功',
        data: {
          accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQ3ZmFkMjYyLTRlOGItNDdmMS1iZWI0LTVjZjU5OTlkNTU1MCJ9.1OJ1mxeBSt_DRNRqs4ZQcvHzc5BioE08f06ALXse2vRBClhlVgIFvdHBArtNK-dTx0POa6BrDxz4zxyG4ToSpw'
        }
      }
    }
  },
  // 获取用户详细信息
  {
    url: '/api/v1/user/getInfo',
    method: 'get',
    response: () => {
      return getInfoData
    }
  },
  // 退出方法
  {
    url: '/auth/logout',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: true
      }
    }
  }
] as MockMethod[]
