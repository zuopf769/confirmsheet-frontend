export function usePagination() {
  // 分页条信息
  const pageInfo = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  // 排序字段
  const sortInfo = reactive({
    orderBy: 'time',
    sort: 'desc'
  })

  // 重置到第一页
  const resetPageNum = () => {
    pageInfo.pageNum = 1
  }

  // 设置总条数
  const setTotal = (total) => {
    pageInfo.total = total
  }

  return {
    pageInfo,
    sortInfo,
    resetPageNum,
    setTotal
  }
}
