import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configMockPlugin } from './mock'
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  const { VITE_APP_IS_LOCAL } = viteEnv

  const vitePlugins = [vue(), vueJsx({})]
  // vite-plugin-mock
  Number(VITE_APP_IS_LOCAL) && vitePlugins.push(configMockPlugin(isBuild))
  vitePlugins.push(createAutoImport())
  // vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
