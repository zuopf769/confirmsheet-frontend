<template>
  <div class="main-header">
    <Hamburger
      id="hamburger-container"
      :is-active="!sidebarHide"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <Breadcrumb />
  </div>
</template>
<script setup lang="ts" name="MainHeader">
  import Breadcrumb from '@/layout/breadcrumb/index.vue'
  import Hamburger from '@/layout/hamburger/index.vue'
  import useAppStore from '@/store/app'

  const appStore = useAppStore()

  const sidebarHide = computed(() => appStore.getSidebarHide!)

  const toggleSideBar = () => {
    appStore.setAppData('sidebarHide', !sidebarHide.value)
  }
</script>
<style lang="scss" scoped>
  .main-header {
    height: 50px;
    overflow: hidden;
    position: relative;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
</style>
