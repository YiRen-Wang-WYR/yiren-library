// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 如果部署到 https://username.github.io/<repo>/ ，把 <repo> 换成仓库名；
// 如果部署到 username.github.io 根站，base 写成 '/'。
const base =
  process.env.NODE_ENV === 'production' ? '/yiren-library/' : '/'

export default defineConfig({
  base,
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
