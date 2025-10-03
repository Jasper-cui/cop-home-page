import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/cop-home-page/',
  plugins: [
    tailwindcss(),
  ],
})
