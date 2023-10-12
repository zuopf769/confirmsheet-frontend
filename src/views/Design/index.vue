<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useRouteQuery } from '@vueuse/router'

  import { Edit, DocumentChecked, Back } from '@element-plus/icons-vue'
  import { defaultOptions as colDesignOptions } from '@/configs/colDesignOptions'
  import { defaultOptions as cellDesignOptions } from '@/configs/cellDesignOptions'
  import { Local } from '@/utils/storage'

  const router = useRouter()
  const route = useRoute()

  const id = useRouteQuery('id')

  const hook = {
    cellMousedown: (cell, postion, sheet, ctx) => {
      console.log(cell)
    },
    cellUpdateBefore: (r, c, value, isRefresh) => {
      console.log('sxx', value)
    },
    cellEditBefore: (range) => {
      console.log(range)
    },
    rangeSelect: (sheet, range) => {
      console.log(sheet, range)
    }
  }

  const defaultOptions = computed(() => {
    return (id.value as any) === '1' ? colDesignOptions : cellDesignOptions
  })

  const options = computed(() => {
    return { ...defaultOptions.value, hook }
  })

  onMounted(() => {
    window.luckysheet.destroy()
    window.luckysheet.create(options.value)
  })

  // 保存
  const handleSave = () => {
    const data = window.luckysheet.getAllSheets()
    Local.set('sheet-data', JSON.stringify(data))
  }

  // 跳转到预览测试填报
  const gotoPreview = () => {
    window.open(`/preview/${id.value}`)
  }

  // 返回
  const goBack = () => {
    router.go(-1)
  }
</script>

<template>
  <div class="app-container">
    <div class="toolbar-wrap">
      <el-button :icon="Back" class="mr-4" @click="goBack">返回</el-button>
      <el-button-group>
        <!-- <el-button :icon="Plus" @click="addRow">添加记录</el-button> -->
        <!-- <el-button :icon="Setting">字段配置</el-button> -->
        <!-- <el-button :icon="Upload">上传</el-button> -->
        <!-- <el-button :icon="Download">下载</el-button> -->
        <el-button :icon="DocumentChecked" @click="handleSave">保存</el-button>
        <!-- <el-button :icon="Printer">打印</el-button> -->
        <el-button :icon="Edit" @click="gotoPreview">进入填报模式</el-button>
      </el-button-group>
    </div>
    <div class="sheet-wrap">
      <div
        id="luckysheet"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app-container {
    display: flex;
    height: 100%;
    padding: 16px;
    overflow-y: auto;
    flex-direction: column;

    .toolbar-wrap {
      display: flex;
      height: 60px;
      align-items: center;
    }

    .sheet-wrap {
      position: relative;
      flex: 1;
    }
  }
</style>
