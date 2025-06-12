// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/trade-locator/', // 👈 IMPORTANT: Use your repo name here
  plugins: [react()],
})
