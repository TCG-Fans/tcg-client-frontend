import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import tailwindAutoReference from "vite-plugin-vue-tailwind-auto-reference";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss(), tailwindAutoReference(),  basicSsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
