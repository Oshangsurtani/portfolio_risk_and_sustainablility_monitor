import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // Add server options to potentially resolve timer issues
    hmr: {
      overlay: false
    }
  },
  // Add build options for better compatibility
  build: {
    target: 'esnext',
    minify: 'esbuild'
  },
  // Optimize dependencies to avoid potential conflicts
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})