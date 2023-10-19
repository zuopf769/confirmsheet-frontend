<template>
  <div class="sheet-list-wrapper p-[16px]">
    <div class="query-form-wrapper">
      <el-form ref="queryFormRef" :inline="true" :model="formSearch">
        <el-form-item prop="sheetType">
          <el-select v-model="formSearch.sheetType" placeholder="请输入表格类型">
            <el-option label="列表格" value="column" />
            <el-option label="单元格表格" value="cell" />
          </el-select>
        </el-form-item>
        <el-form-item prop="sheetName">
          <el-input v-model="formSearch.sheetName" placeholder="请输入表格名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="onFormSubmit">查询</el-button>
          <el-button icon="RefreshRight" @click="onRestFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool-bar-container">
      <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
    </div>
    <div class="table-list-container">
      <el-table v-loading="loading" :data="sheetList" style="width: 100%" height="560">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="表格名称" prop="sheetName" />
        <el-table-column label="表格类型" prop="sheetType" />
        <el-table-column label="更新时间" prop="time" />
        <el-table-column label="操作" width="355" align="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button size="small" @click="handleCopy(scope)">复制</el-button>
            <el-button size="small" @click="handleDesign(scope)">设计</el-button>
            <el-button size="small" @click="gotoPreview(scope)">预览</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pageInfo.pageNum"
          v-model:page-size="pageInfo.pageSize"
          class="float-right py-8"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 50, 100]"
          :total="pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <SheetForm v-model:visible="formVisible" :mode="formModeRef"></SheetForm>
</template>

<script lang="ts" setup>
  import type { FormInstance } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useSheetListStore } from '@/store/sheetList'
  import SheetForm from './Form/index.vue'

  const sheetListStore = useSheetListStore()

  const { sheetList } = storeToRefs(sheetListStore)

  const formVisible = ref()
  const formModeRef = ref()

  const router = useRouter()

  // 查询表单数据
  const formSearch = reactive({
    sheetType: '',
    sheetName: ''
  })
  // 分页信息
  const pageInfo = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  // 排序
  const sortInfo = reactive({
    orderBy: 'time',
    sort: 'desc'
  })
  // 查询表单ref
  const queryFormRef = ref<FormInstance | undefined>()
  // 表格数据加载中
  const loading = ref(false)

  // 查询按钮
  const onFormSubmit = () => {}

  // 重置查询按钮
  const onRestFrom = () => {
    if (queryFormRef.value === undefined) return
    queryFormRef.value.resetFields()
  }

  // 新增
  const handleAdd = () => {
    formVisible.value = true
    formModeRef.value = 'ADD'
  }

  // 复制
  const handleCopy = (scope) => {}

  // 编辑
  const handleEdit = (scope) => {}

  // 设计
  const handleDesign = ({ row }) => {
    console.log(row)
    router.push({ path: '/sheet/design', query: { id: row.id } })
  }

  // 预览
  const gotoPreview = (scope) => {}

  // 删除
  const handleDelete = (scope) => {}

  //
  const handleSizeChange = () => {}

  const handleCurrentChange = () => {}
</script>

<style lang="scss" scoped></style>
