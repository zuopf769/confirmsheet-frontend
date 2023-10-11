import { h, render } from 'vue'
import XSelectConstructor from './index.vue'
import { ElButton } from 'element-plus'

export const XSelect = ({ appendTo, ...options }) => {
  const container = document.createElement('div')

  const props = {
    ...options
  }

  const vnode = h(XSelectConstructor, props)

  render(vnode, container)
  // appendTo.style.display = 'none'
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  appendTo.firstElementChild.appendChild(container.firstElementChild!)
}
