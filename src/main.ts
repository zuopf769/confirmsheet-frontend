import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 先tailwindcss
import './styles/index.scss'

// 后element-puls css, 确保按钮样式不被覆盖
// import VueSynth from 'vue-synth'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import CollapseTitle from '@/components/common/CollapseTitle.vue'
import LucideIcon from '@/components/common/LucideIcon.vue'

import 'virtual:svg-icons-register'
import { resetForm } from '@/utils/common'
import directive from '@/directive'

// 注册指令
import plugins from '@/plugins'

// 路由权限 - 登录和菜单权限
// import './permission'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.resetForm = resetForm

const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(plugins)
app.component('LucideIcon', LucideIcon)
app.component('CollapseTitle', CollapseTitle)
directive(app)
app.mount('#app')
