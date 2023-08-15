import compression from 'vite-plugin-compression'

export default function createCompression(env: any) {
  const { VITE_BUILD_COMPRESS } = env
  const plugin: any = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      plugin.push(
        compression({
          ext: '.gz', // 压缩包后缀
          deleteOriginFile: false // 压缩后是否删除原文件，默认为 false
        })
      )
    }
    if (compressList.includes('brotli')) {
      plugin.push(
        compression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false
        })
      )
    }
  }
  return plugin
}
