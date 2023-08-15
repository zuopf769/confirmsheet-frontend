// 字段id 正则
export const patternFieldId = /^[a-zA-Z0-9_-]+$/g

// 表单链接url 正则
export const patternFormUrl = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g

// 实体名称正则  数字，字母，小数点
export const patternEntityName = /^([a-zA-Z0-9.])+$/g
/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}
