export {}

// 全局自定义属性
declare module 'vue' {
  interface ComponentCustomProperties {
    resetForm: Function
  }
}
