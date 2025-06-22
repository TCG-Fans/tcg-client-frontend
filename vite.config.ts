import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import tailwindAutoReference from "vite-plugin-vue-tailwind-auto-reference";

// https://vite.dev/config/
export default defineConfig({
  base: 'tcg-client-frontend',
  plugins: [vue(), tailwindcss(), tailwindAutoReference()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
