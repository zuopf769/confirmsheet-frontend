<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <svg-icon :name="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title>
            <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" teleported>
      <template v-if="item.meta" #title>
        <svg-icon :name="item.meta && item.meta.icon" />
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts" name="SidebarItem">
  import SvgIcon from '@/components/common/SvgIcon.vue'
  import AppLink from './Link.vue'
  import { isExternal } from '@/utils/validate'

  const props = defineProps({
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  })
  // console.log(props.item)
  const onlyOneChild = ref<any>({})

  function hasOneShowingChild(children = [], parent: any) {
    if (!children) {
      children = []
    }
    const showingChildren = children.filter((item: any) => {
      if (item.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item
        return true
      }
    })

    // 当只有一个 child router, 默认直接显示这个 child router 菜单, 不显示父目录
    // if (showingChildren.length === 1) {
    //   return true
    // }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  function resolvePath(routePath: string, routeQuery?: any): any {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }
    if (routeQuery) {
      const query = JSON.parse(routeQuery)
      return { path: getNormalPath(props.basePath + '/' + routePath), query: query }
    }
    return getNormalPath(props.basePath + '/' + routePath)
  }

  function hasTitle(title: string) {
    if (title.length > 5) {
      return title
    } else {
      return ''
    }
  }

  // 返回项目路径
  function getNormalPath(p: string): string {
    if (p.length === 0 || !p || p === 'undefined') {
      return p
    }
    const res = p.replace('//', '/')
    if (res[res.length - 1] === '/') {
      return res.slice(0, res.length - 1)
    }
    return res
  }
</script>
