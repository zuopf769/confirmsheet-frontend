import AutoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    dts: 'types/auto-imports.d.ts', // 生成文件位置
    eslintrc: {
      enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
      filepath: './.eslintrc-auto-import.json', // 生成json文件
      globalsPropValue: true
    }
  })
}
