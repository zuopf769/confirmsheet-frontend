// 表单重置
export function resetForm(this: any, refName: string) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 从url截取origin
export const getOriginFromUrl = (url: string) => {
  const urlArr = url?.split('/') || []
  return urlArr.length >= 3 ? `${urlArr[0]}//${urlArr[2]}` : ''
}
