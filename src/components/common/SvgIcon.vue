<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#${name}`" :fill="color" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SvgIcon',
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: 'bpmn-icon-process'
      },
      color: {
        type: String,
        default: '' //这里不要初始设置颜色'#1d1d1f'，否则css color不起作用
      }
    }
  })
</script>
<style lang="scss" scoped>
  .svg-icon {
    position: relative;
    width: 1em;
    height: 1em;
    vertical-align: -2px;
    fill: currentcolor;
  }
</style>
