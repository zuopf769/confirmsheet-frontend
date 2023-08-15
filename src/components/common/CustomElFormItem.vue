<!-- 重新定义 <el-form-item /> 组件 label 位置在 top，点击 label 时不触发 input 输入等事件 -->
<template>
  <div class="custom-form-item">
    <el-form-item v-bind="$attrs">
      <div v-if="label" :class="`custom-form-item-label ${required && 'is-required'}`">{{ label }}</div>
      <slot></slot>
    </el-form-item>
  </div>
</template>
<script lang="ts">
  export default defineComponent({
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      },
      // 是否必填
      required: {
        type: Boolean,
        default: false
      }
    }
  })
</script>
<style lang="scss" scoped>
  :deep(.el-form-item__content) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .custom-form-item-label {
    height: 32px;
    padding: 0 12px 0 0;
    font-size: var(--el-form-label-font-size);
    line-height: 32px;
    color: var(--el-text-color-regular);
    box-sizing: border-box;
  }

  .custom-form-item-label.is-required::after {
    margin-left: 4px;
    color: var(--el-color-danger);
    content: '*';
  }
</style>
