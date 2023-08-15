import request from '@/utils/request'

// 查询发布事件列表
export const getPublishEventList = (data: object) => {
  return request({
    url: '/event/find_publish_by_condition',
    method: 'post',
    data
  })
}

// 保存发布事件
export const savePublishEvent = (data: object) => {
  return request({
    url: '/event/save_publish',
    method: 'post',
    data
  })
}

// 修改发布事件
export const updatePublishEvent = (data: object) => {
  return request({
    url: '/event/update_publish',
    method: 'post',
    data
  })
}

// 删除发布事件
export const deletePublishEvent = (data: object) => {
  return request({
    url: '/event/delete_publish',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 校验topic的唯一性
export const checkTopic = (data: object) => {
  return request({
    url: '/event/check_topic',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 发送事件信息
export const sendEventInfo = (data: object) => {
  return request({
    url: '/event/send_event_info',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 通过发布事件ID查询事件信息
export const getPublishMsg = (data: object) => {
  return request({
    url: '/event/find_msg_by_publish',
    method: 'post',
    data
  })
}
