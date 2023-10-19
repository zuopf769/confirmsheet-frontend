<template>
  <el-dialog :model-value="props.visible" :title="modalTitle" width="30%" @close="handleClose">
    <div class="sheet-form-wrapper">
      <el-form-renderer ref="form" v-model:FormData="FormData" label-width="60px" :content="content">
      </el-form-renderer>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm()">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useSheetListStore } from '@/store/sheetList'
  import { ISheetFormProps, ISheetFormEvent } from './types'
  import { TITLE_TYPES } from '@/constants'
  import { FormContent } from './constant'
  import uuid from '@/utils/uuid'
  import dayjs from 'dayjs'
  dayjs.locale('zh-cn')

  const props = withDefaults(defineProps<ISheetFormProps>(), {
    visible: false,
    title: '新增表格',
    mode: 'ADD',
    data: {}
  })

  const emit = defineEmits<ISheetFormEvent>()

  const sheetListStore = useSheetListStore()

  const { addSheet } = sheetListStore

  const loading = ref(false)

  const modalTitle = computed(() => {
    return `${TITLE_TYPES[props.mode]}表格`
  })

  const handleClose = () => {
    emit('update:visible', false)
  }

  const form = ref()

  const FormData = reactive({
    sheetName: '',
    sheetType: 'col',
    template: 'null'
  })
  const content = reactive(FormContent)

  const resetForm = () => {
    form.value.methods.resetFields()
    handleClose()
  }
  const submitForm = () => {
    form.value.methods.validate((valid, fields) => {
      if (valid) {
        const newSheet = form.value.getFormValue()
        newSheet.id = uuid()
        newSheet.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
        addSheet(newSheet)
        form.value.methods.resetFields()
        handleClose()
      } else {
        console.log('error submit!', fields)
      }
    })
  }
</script>

<style lang="scss" scoped>
  .sheet-form-wrapper {
    :deep(.el-select) {
      width: 100%;
    }
  }
</style>
