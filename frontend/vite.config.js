import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allow:['node_modules', './bootstrap-icons/font/bootstap-icons.css']
  }
})
