<script lang="ts" setup>
  import { Plus, Setting, Upload, Download, Edit, DocumentChecked, Printer } from '@element-plus/icons-vue'
  import { defaultOptions } from '@/configs/defaultOptions'
  import { XSelect } from '@/components/XSelect/index'

  const open = ref(false)

  const drawer = ref(false)

  const hook = {
    cellMousedown: (cell, postion, sheet, ctx) => {
      console.log(cell)
    },
    cellUpdateBefore: (r, c, value, isRefresh) => {
      console.log('sxx', value)
    },
    cellEditBefore: (range) => {
      console.log(range)
      setTimeout(() => {
        const targetDom = document.getElementById('luckysheet-input-box')
        console.log('11111', targetDom!.getBoundingClientRect())
        open.value = true

        // XSelect({ appendTo: targetDom })
      })
    },
    rangeSelect: (sheet, range) => {
      // console.log(sheet, range)
      // drawer.value = true
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
        <el-button :icon="Plus" @click="addRow">添加记录</el-button>
        <el-button :icon="Setting">字段配置</el-button>
        <el-button :icon="Upload">上传</el-button>
        <el-button :icon="Download">下载</el-button>
        <el-button :icon="DocumentChecked">保存</el-button>
        <el-button :icon="Printer">打印</el-button>
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
  <el-drawer v-model="drawer" title="单元格配置">
    <span>Hi, there!</span>
  </el-drawer>
  <Teleport to=".luckysheet-cell-input">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;

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

  .modal {
    position: fixed;
    top: 20%;
    left: 50%;
    z-index: 999;
    width: 300px;
    margin-left: -150px;
  }
</style>
