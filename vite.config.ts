import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // 使得网络中的其他设备可以访问
    port: 5173, // 设置服务启动端口号
  //   open: false, // 设置服务启动时是否自动打开浏览器
  //   cors: true, // 允许跨域

  //   // 设置代理，根据我们项目实际情况配置
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //       // secure: false,
  //       // rewrite: (path) => path.replace('/api/', '')
  //     }
  //   }
  }
})
