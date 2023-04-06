import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import postCssPxToRem from "postcss-pxtorem"
import autoprefixer from 'autoprefixer'
import eslintPlugin from 'vite-plugin-eslint'

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    // 增加下面的配置项,这样在运行时就能检查 eslint 规范
    eslintPlugin({
      // include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      include: ['src/**/*.vue', 'src/*.vue']
      // cache: false
    })
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({ // 屏幕自适应，px>rem转换
          rootValue: 37.5, // 1rem的大小 75表示750设计稿，37.5表示375设计稿
          propList: ['*'], // 可以从px更改为rem的属性，这里选择全部都进行转换，感叹号开头的不转换
          unitPrecision: 6, // 计算结果保留 6 位小数
          selectorBlackList: ['.no-rem', 'no-rem'], // 要忽略的选择器并保留为px。
          replace: true, // 转换成 rem 以后，不保留原来的 px 单位属性
          mediaQuery: true, // 允许在媒体查询中转换px。
          minPixelValue: 2, // 设置要替换的最小像素值。
          exclude: /node_modules/i // 排除 node_modules 文件(node_modules 内文件禁止转换)
        }),
        autoprefixer({ // 自动添加浏览器厂商前缀，解决浏览器兼容性
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'not ie <= 11', // 不考虑IE浏览器
            'ff >= 30', // 仅新版本用“ff>=30
            '> 1%',// 全球统计有超过1%的使用率使用“>1%”;
            'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  }
})

