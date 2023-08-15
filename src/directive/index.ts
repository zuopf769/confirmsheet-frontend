import { App } from 'vue'
import onBlur from './onBlur'

const directive = (app: App): void => {
  // 移除焦点
  app.directive('onBlur', onBlur)
}

export default directive
