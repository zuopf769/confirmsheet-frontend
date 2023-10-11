<script lang="ts" setup>
  import { Edit, DocumentChecked } from '@element-plus/icons-vue'
  import { defaultOptions } from '@/configs/defaultOptions'

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

  const options = computed(() => {
    return { ...defaultOptions, hook }
  })

  onMounted(() => {
    window.luckysheet.destroy()
    window.luckysheet.create(options.value)
  })

  const addRow = () => {
    window.luckysheet.insertRow(0)
  }
</script>

<template>
  <div class="app-container">
    <div class="toolbar-wrap">
      <el-button-group>
        <!-- <el-button :icon="Plus" @click="addRow">添加记录</el-button> -->
        <!-- <el-button :icon="Setting">字段配置</el-button> -->
        <!-- <el-button :icon="Upload">上传</el-button> -->
        <!-- <el-button :icon="Download">下载</el-button> -->
        <el-button :icon="DocumentChecked">保存</el-button>
        <!-- <el-button :icon="Printer">打印</el-button> -->
        <el-button :icon="Edit">进入填报模式</el-button>
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
