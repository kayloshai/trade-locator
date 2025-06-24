// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/trade-locator/',
  plugins: [react()],
  server: {
    host: true, // or use '0.0.0.0'
  }

})
