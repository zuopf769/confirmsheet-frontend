import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { sheetList as defaultList } from '@/configs/sheetList'

export const useSheetListStore = defineStore(
  'sheetList',
  () => {
    const sheetListState = reactive({
      list: defaultList
    })

    const sheetList = computed(() => {
      return sheetListState.list
    })

    const addSheet = (sheet) => {
      sheetListState.list.push(sheet)
    }

    return { sheetList, addSheet }
  },
  {
    persist: true
  }
)
