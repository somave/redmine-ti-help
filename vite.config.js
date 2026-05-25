import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-redmine': {
        target: 'https://redmine.somave.com.br',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-redmine/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
