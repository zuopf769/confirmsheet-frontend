<script lang="ts" setup>
  import { useRouteQuery } from '@vueuse/router'
  import { Local } from '@/utils/storage'
  import { defaultFillOptions as colFillDesignOptions } from '@/configs/colFillOptions'
  import { defaultFillOptions as cellFillDesignOptions } from '@/configs/cellFillOptions'

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

  const defaultFillOptions = computed(() => {
    return (id.value as any) === '1' ? colFillDesignOptions : cellFillDesignOptions
  })

  const options = computed(() => {
    const data = JSON.parse(Local.get('sheet-data'))
    const config = { ...defaultFillOptions.value, hook }
    config.data = data
    return config
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
