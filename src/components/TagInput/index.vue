<script lang="ts" setup>
  import { useFormItem } from 'element-plus'

  interface ITagInputProps {
    modelValue: string
  }

  const props = withDefaults(defineProps<ITagInputProps>(), {
    modelValue: ''
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const { formItem } = useFormItem()

  const isFocus = ref(false)
  const tagInputRef = ref()

  const tags = computed(() => {
    const modelValue = props.modelValue
    return modelValue === '' ? [] : modelValue.split(',')
  })

  // 校验状态
  const isError = computed(() => {
    return formItem?.validateState === 'error'
  })

  // 回车后添加tag
  const handleInputEnter = (inputEl) => {
    if (inputEl.value === '') return
    emit('update:modelValue', [...tags.value, inputEl.value].join(','))
    inputEl.value = ''
  }

  // 失去焦点后添加tag
  const handleInputBlur = (inputEl) => {
    isFocus.value = false
    handleInputEnter(inputEl)
    // 触发表单校验
    formItem?.validate?.('blur')
  }

  const handleCloseTag = (index: number) => {
    tags.value.splice(index, 1)
    emit('update:modelValue', [...tags.value].join(','))
    // 输入框获得焦点
    tagInputRef.value?.focus()
  }
</script>

<template>
  <div :class="['tag-input__wrapper', isFocus ? 'is-focus' : '', isError ? 'is-error' : '']">
    <template v-if="tags.length > 0">
      <el-tag
        v-for="(tag, index) in tags"
        :key="`${tag}-${index}`"
        class="mb-[2px] mr-[2px]"
        type="info"
        closable
        @close="handleCloseTag(index)"
        >{{ tag }}</el-tag
      >
    </template>
    <input
      ref="tagInputRef"
      class="tag-input__input"
      @focus="isFocus = true"
      @blur="handleInputBlur($event?.target as HTMLInputElement)"
      @keyup.enter="handleInputEnter($event?.target as HTMLInputElement)"
    />
  </div>
</template>

<style scoped>
  .tag-input__wrapper {
    padding: 1px 11px;
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    transform: translateZ(0);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    transition: var(--el-transition-box-shadow);
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  .tag-input__wrapper:hover {
    box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
  }

  .tag-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
  }

  .tag-input__wrapper.is-error {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset !important;
  }

  .tag-input__input {
    height: var(--el-input-inner-height);
    padding: 0 0 0 4px;
    font-size: inherit;
    color: var(--el-text-color-regular);
    background: 0 0;
    border: none;
    outline: 0;
    box-sizing: border-box;
    appearance: none;
    flex-grow: 1;
  }
</style>
