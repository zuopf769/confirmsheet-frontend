import dayjs from 'dayjs'
dayjs.locale('zh-cn')

export * from './event'
export * from './source'

// modal弹窗标题类型
export const TITLE_TYPES = {
  ADD: '新增',
  EDIT: '编辑',
  VIEW: '查看'
}

// 默认时间筛选到：明天的23:59:59及往前推一周
// 事件控件最多能选1年
// 取当天的后一天的23:59:59秒
export const today = dayjs().add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
// 今天往前推7天
export const before7Day = dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss')
// 今天往前推1年
export const before1Year = dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss')
