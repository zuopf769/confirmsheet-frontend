import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon(isBuild?: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [
      // path.resolve(process.cwd(), 'src/assets/bpmn-icons'),
      path.resolve(process.cwd(), 'src/assets/main-icons')
    ],
    // 指定symbolId格式
    symbolId: '[name]', // '[name]'
    // symbolId: 'icon-[dir]-[name]', // '[name]'
    customDomId: '__svg__icons__dom__',
    svgoOptions: isBuild
  })
}
