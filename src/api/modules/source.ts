import request from '@/utils/request'

// 查询集成源列表
export const getSourceList = (data: object) => {
  console.log('data', data)
  return request({
    url: '/event/find_sources_by_condition',
    method: 'post',
    data
  })
}

// 查询集成源列表
export const saveSource = (data: object) => {
  return request({
    url: '/event/save_source',
    method: 'post',
    data
  })
}

// 根据id删除集成源列表
export const deleteSource = (id: string) => {
  return request({
    url: '/event/save_source',
    method: 'post',
    data: {
      id
    }
  })
}

// 批量删除

// 根据id更新集成源
export const updateSource = (data: object) => {
  return request({
    url: '/event/update_source',
    method: 'post',
    data
  })
}
