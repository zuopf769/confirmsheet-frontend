<script lang="ts" setup>
  import { Local } from '@/utils/storage'
  import { defaultFillOptions } from '@/configs/defaultFillOptions'

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
    const data = JSON.parse(Local.get('sheet-data'))
    return { ...defaultFillOptions, hook, data }
  })

  onMounted(() => {
    window.luckysheet.destroy()
    window.luckysheet.create(options.value)
  })
</script>

<template>
  <div class="sheet-fill-wrap">
    <div
      id="luckysheet-preview"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0"
    ></div>
  </div>
</template>

<style lang="scss" scoped></style>
