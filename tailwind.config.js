const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  // dark: 'class', // 使用 class 定义深色主题  <html class="dark"></html>
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 定义主题
      colors: {
        transparent: 'var(--transparent-color)',
        default: 'var(--process-text-default-color)',
        primary: 'var(--el-color-primary)' /* 主色：color="primary" | text-primary | bg-primary */,

        info: 'var(--el-color-info)' /* 功能色（灰）：color="info" | text-info | bg-info */,
        success: 'var(--el-color-success)' /* 功能色（绿）：color="success" | text-success | bg-success */,
        danger: 'var(--el-color-danger)' /* 功能色（红）：color="danger" | text-danger | bg-danger */,
        warning: 'var(--el-color-warning)' /* 功能色（橙）：color="warning" | text-warning | bg-warning */,

        disabled: 'var(--process-disabled-text-color)'

        // green: colors.green[600]
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        box: 'var(--box-shadow)'
      }
    }
  },
  plugins: []
}
