<template>
  <div>
    <!-- <div class="text-primary"><router-link to="/index"> 首页 </router-link></div> -->
    <div class="flex h-[50px] w-[120px] items-center">
      <el-avatar class="mr-2 !w-auto min-w-[40px]"> {{ userStore.name }} </el-avatar>
      <el-button type="primary" size="default" @click="logout">退出</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import useUserStore from '@/store/user'
  import { ElMessageBox } from 'element-plus'

  const userStore = useUserStore()
  function logout() {
    ElMessageBox.confirm('确定注销并退出系统吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showClose: false,
      buttonSize: 'default',
      customClass: 'custom-confirm-message-box'
    })
      .then(() => {
        userStore.logOut().then(() => {
          location.href = '/'
        })
      })
      .catch(() => {})
  }
</script>
