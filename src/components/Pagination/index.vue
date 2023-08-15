<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      default
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="Number(total)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    // 总条数
    total: {
      required: true,
      type: [Number, String]
    },
    // 当前是第几页
    page: {
      type: Number,
      default: 1
    },
    // 每页最多显示几条
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:page', 'update:limit', 'pagination'])
  const currentPage = useVModel(props, 'page', emit)
  const pageSize = useVModel(props, 'limit', emit)

  function handleSizeChange(val) {
    if (currentPage.value * val > Number(props.total)) {
      currentPage.value = 1
    }
    emit('pagination', { page: currentPage.value, limit: val })
    // if (props.autoScroll) {
    //   scrollTo(0, 800)
    // }
  }
  function handleCurrentChange(val) {
    emit('pagination', { page: val, limit: pageSize.value })
    // if (props.autoScroll) {
    //   scrollTo(0, 800)
    // }
  }
</script>

<style scoped lang="scss">
  .pagination-container {
    padding: 16px;
    background: #fff;
  }

  .pagination-container.hidden {
    display: none;
  }

  :deep(.el-pagination) {
    justify-content: end;
  }
</style>
