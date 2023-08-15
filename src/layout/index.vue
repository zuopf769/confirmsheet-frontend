<!-- -->
<template>
  <section class="app-wrapper">
    <el-config-provider :size="config.size" :locale="config.language">
      <!-- 顶部 barnner 待本系统登录测试使用 -->
      <Barnner class="absolute right-0 top-0 z-10" />
      <div class="content-box flex">
        <NavMenu class="sidebar-container" />
        <section class="main-container flex-1 px-[16px] pb-[16px] pt-0">
          <MainHeader />
          <div class="bg-white" style="height: calc(100% - 50px)">
            <router-view v-slot="{ Component, route }">
              <!-- <transition name="fade-transform" mode="out-in"> -->
              <keep-alive>
                <component :is="Component" v-if="$route.meta.keepAlive" :key="route.path" />
              </keep-alive>
              <component :is="Component" v-if="!$route.meta.keepAlive" :key="route.path" />
              <!-- </transition> -->
            </router-view>
          </div>
        </section>
      </div>
    </el-config-provider>
  </section>
</template>
<script setup lang="ts" name="Layout">
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import Barnner from './NavBar.vue'
  import NavMenu from './navMenu/index.vue'
  import MainHeader from './mainHeader/index.vue'

  const config = reactive({
    language: zhCn,
    size: 'large'
    // autoInsertSpace: true //:button="config.autoInsertSpace"
  })
</script>
