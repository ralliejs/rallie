import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rallie/',
  build: {
    rollupOptions: {
      input: {
        host: path.resolve(__dirname, './index.html'),
        'react-app': path.resolve(__dirname, './apps/react-app/index.html'),
        'vue-app': path.resolve(__dirname, './apps/vue-app/index.html')
      }
    }
  },
  plugins: [
    vue(),
    react()
  ]
})
