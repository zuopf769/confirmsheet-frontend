import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import testFlowData from '../data/diagramFlow'
import testGroupListTreeData from '../data/groupListTree'

const nodeListData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  }
]
export default [
  // 获取左侧 palette 菜单树数据
  {
    url: '/test/ws/api/groupList',
    methods: 'get',
    response: (res: any) => {
      return {
        message: '查询成功',
        code: 200,
        obj: testGroupListTreeData
      }
    }
  },
  // 获取 流程图数据
  {
    url: '/test/ws/api/getFlow',
    method: 'get',
    response: (res: any) => {
      return {
        message: '操作成功',
        code: 200,
        obj: testFlowData
      }
    }
  },
  // 保存 画布
  {
    url: '/test/ws/api/saveFlow',
    method: 'post',
    response: (res: any) => {
      return {
        message: '操作成功',
        code: 200,
        data: testFlowData
      }
    }
  },
  // 设置输出变量
  {
    url: '/api/setVariables',
    method: 'post',
    response: (res: any) => {
      return {
        message: '操作成功',
        code: 200,
        data: false
      }
    }
  },
  // 删除输出变量 节点
  {
    url: '/api/delVariables',
    method: 'delete',
    response: (res: any) => {
      return {
        message: '操作成功',
        code: 200,
        data: false
      }
    }
  },
  // 获取输出变量
  {
    url: '/api/getVariables',
    method: 'get',
    response: (res: any) => {
      return {
        message: '操作成功',
        code: 200,
        obj: nodeListData
      }
    }
  }
] as MockMethod[]
