import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_APP_BASE_API } = env

  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.xxx.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.xxx.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    // base: VITE_APP_ENV === 'production' ? '/process/' : '/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
        types: path.resolve(__dirname, './types')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 3020,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        [VITE_APP_BASE_API]: {
          target: 'http://124.70.24.169:8601', // dev服务器地址
          // target: 'http://192.168.10.94:8080', // dev服务器地址
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(new RegExp('^' + VITE_APP_BASE_API), '')
          }
          // rewrite: (path) => path.replace(/^\/dev-api/, '')
        }
      }
    },
    // 单元测试配置
    test: {
      // 测试覆盖率
      coverage: {
        reporter: ['text', 'json', 'html']
      }
    },
    // 打包配置
    build: {
      minify: 'terser', // 默认esbuild, vite v3 need install terser
      terserOptions: {
        compress: {
          drop_console: false, // 后期改成true
          drop_debugger: true
        },
        output: {
          // 是否保留代码中的注释
          comments: false
        }
      }
      // chunkSizeWarningLimit: 1500, // 规定触发警告的 chunk 大小
      // rollupOptions: {
      //   output: {
      //     entryFileNames: `assets/[name].[hash]-` + hash + `.js`,
      //     chunkFileNames: `assets/[name].[hash]-` + hash + `.js`,
      //     assetFileNames: `assets/[name].[hash]-` + hash + `.[ext]`,
      //     compact: true,
      //     manualChunks: {
      //       vue: ['vue', 'vue-router', 'pinia']
      //       // ,echarts: ['echarts']
      //     }
      //   }
      // }
    }
  }
})
