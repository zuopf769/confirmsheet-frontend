<script lang="ts" setup>
  const handleAdd = () => {}
</script>

<template>
  <div class="template-list-wrapper p-[16px]">
    <div class="tool-bar-container">
      <el-button type="primary" icon="Plus" @click="handleAdd">新建模板</el-button>
    </div>
    <div class="tpl-list-wrap">
      <div class="tpl-item"> </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tpl-item {
    width: 240px;
    height: 202px;
  }
</style>
