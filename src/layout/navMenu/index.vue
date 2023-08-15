<template>
  <div v-show="!sidebarHide" class="navMenu-main">
    <div
      class="bottom-split-line flex h-[40px] items-center justify-center text-[16px] font-bold text-white"
      style="font-family: SourceHanSansCN-Bold"
    >
      技术中台确认表格
    </div>
    <el-scrollbar class="" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="sidebarHide"
        :background-color="'var(--process-el-menu-background)'"
        :text-color="'var(--process-el-menu-color)'"
        :unique-opened="true"
        :active-text-color="'var(--process-el-menu-active-text-color)'"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(aroute, index) in sidebarRouters"
          :key="aroute.path + index"
          :item="aroute"
          :base-path="aroute.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts" name="NavMenu">
  import useAppStore from '@/store/app'
  // import variables from '@/styles/theme.scss'
  import sheetRouter from '@/router/sheetRouter'
  import SidebarItem from './SidebarItem.vue'

  const route = useRoute()
  const appStore = useAppStore()
  const sidebarHide = computed(() => appStore.getSidebarHide)

  const sidebarRouters = sheetRouter

  const variables = {
    activeTextColor: '#409EFF', // 菜单选中字体颜色
    menuColor: '#bfcbd9', // 菜单字体颜色
    menuBackground: '#00162f' // 菜单背景
  }

  const activeMenu = computed(() => {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })
</script>
<style lang="scss" scoped>
  .bottom-split-line {
    border-bottom: 1px solid #4e5969;
  }
  // .navMenu-main {
  //   width: 240px;
  //   min-width: 240px;
  //   background-color: #001629;
  // }
</style>
@/router/sheetRouter
