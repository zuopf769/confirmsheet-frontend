import Mock from 'mockjs'

// const userTableData1 = Mock.mock({
//   'records|21': [
//     {
//       code: 'zhang@character("lower")',
//       department: {
//         code: 'DE003@character("lower")',
//         id: '@id',
//         name: '测试部门@character("upper")'
//       },
//       id: '@id',
//       name: '张@character("upper")'
//     }
//   ]
// })

const userTableData1 = {
  records: [
    {
      code: 'zhanga',
      department: {
        code: 'DE001',
        id: 1,
        name: '测试部门1'
      },
      id: 1,
      name: '张A'
    },
    {
      code: 'zhangb',
      department: {
        code: 'DE001',
        id: 1,
        name: '测试部门1'
      },
      id: 2,
      name: '张B'
    },
    {
      code: 'zhangc',
      department: {
        code: 'DE001',
        id: 1,
        name: '测试部门1'
      },
      id: 3,
      name: '张C'
    }
  ]
}

const userTableData = [
  {
    code: 'administrator',
    group: {
      code: 'admins',
      id: 1,
      name: 'Administrators'
    },
    id: 1,
    name: 'Administrator'
  },
  {
    code: 'yonghu1',
    id: 2,
    name: '用户1'
  },
  {
    code: 'yonghu2',
    department: {
      code: 'DE003',
      id: 3,
      name: '测试部门3'
    },
    group: {
      code: 'backend-service',
      id: 3,
      name: '后端服务'
    },
    id: 3,
    job: {
      code: 'JO002',
      id: 2,
      name: '岗位2'
    },
    name: '用户2',
    version: 1
  }
]

const rolesData = [
  // { roleId: 'all', roleName: '所有人' },
  // { roleId: 1, roleName: '管理员' },
  // { roleId: 2, roleName: '总经理' }
  {
    id: 1,
    name: '公司领导'
  },
  {
    id: 2,
    name: '一般员工'
  }
]

const deptsTreeData = [
  {
    code: 'DE001',
    id: 1,
    name: '测试部门1',

    children: [
      {
        code: 'DE0011',
        id: 11,
        name: '测试部门11'
      }
    ]
  },
  {
    code: 'DE002',
    id: 2,
    name: '测试部门2'
  },
  {
    code: 'DE003',
    id: 3,
    name: '测试部门3'
  },
  {
    code: 'DE004',
    id: 4,
    name: '技术部'
  }
]

const deptsData = [
  {
    code: 'DE001',
    id: 1,
    name: '测试部门1'
  },
  {
    code: 'DE002',
    id: 2,
    name: '测试部门2'
  },
  {
    code: 'DE003',
    id: 3,
    name: '测试部门3'
  },
  {
    code: 'DE004',
    id: 4,
    name: '技术部'
  }
]

// { jobId: 1, jobName: '总经理' },
const jobsData = [
  {
    code: 'JO001',
    department: {
      code: 'DE001',
      id: 1,
      name: '测试部门1'
    },
    id: 1,
    name: '岗位1'
  },
  {
    code: 'JO002',
    department: {
      code: 'DE002',
      id: 2,
      name: '测试部门2'
    },
    id: 2,
    name: '岗位2'
  },
  {
    code: 'JO003',
    department: {
      code: 'DE004',
      id: 4,
      name: '技术部'
    },
    id: 3,
    name: 'java 开发'
  }
]

export default [
  //-----------用户
  // 获取用户
  {
    url: '/api/v1/user/getList',
    method: 'get',
    response: (res: any) => {
      const resultData = res.query.deptId === 1 + '' ? userTableData1.records : userTableData
      return {
        msg: '操作成功',
        code: 0,
        data: { data: resultData, totalCount: 30 }
      }
    }
  },
  //-----------角色
  // 获取所有角色
  {
    url: '/api/v1/user/getRoleList',
    method: 'get',
    response: (res: any) => {
      return {
        msg: '操作成功',
        code: 0,
        data: rolesData
      }
    }
  },
  //-----------部门
  // 获取 所有部门(树结构)
  {
    url: '/api/v1/user/getDepartmentList',
    method: 'get',
    response: (res: any) => {
      return {
        msg: '操作成功',
        code: 0,
        data: deptsTreeData
      }
    }
  },
  //-----------岗位
  // 获取所有岗位
  {
    url: '/api/v1/user/getJobList',
    method: 'get',
    response: (res: any) => {
      return {
        msg: '操作成功',
        code: 0,
        data: jobsData
      }
    }
  }

  //-----------权限
]
