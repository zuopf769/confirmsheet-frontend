<script lang="ts" setup>
  import { ArrowLeftBold } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const props = withDefaults(
    defineProps<{
      title?: string
    }>(),
    {
      title: '详情'
    }
  )

  const handleBack = () => {
    router.back()
  }
</script>

<template>
  <div class="detail-header-wrap flex h-[50px] items-center border-b">
    <el-button :icon="ArrowLeftBold" @click="handleBack">返回</el-button>
    <div class="pl-4">{{ props.title }}</div>
  </div>
</template>

<style scoped></style>
