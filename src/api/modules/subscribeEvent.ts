import request from '@/utils/request'

// 订阅事件就是创建事件总线

// 查询订阅事件列表
export const getEventBusList = (data: object) => {
  return request({
    url: '/event/find_subscribe_by_condition',
    method: 'post',
    data
  })
}

// 保存订阅事件列表
export const saveEventBus = (data: object) => {
  return request({
    url: '/event/save_subscribe',
    method: 'post',
    data
  })
}

// 保存订阅事件列表
export const updateEventBus = (data: object) => {
  return request({
    url: '/event/update_subscribe',
    method: 'post',
    data
  })
}

// 删除订阅事件
export const deleteEventBus = (data: object) => {
  return request({
    url: '/event/delete_subscribe',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 通过订阅事件ID查询事件信息
export const getSubscribeMsg = (data: object) => {
  return request({
    url: '/event/find_msg_by_subscribe',
    method: 'post',
    data
  })
}
