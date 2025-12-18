import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['react-icons/fa', 'react-icons/fi', 'react-icons/hi2', 'react-icons/io', 'react-icons/ai', 'react-icons/md', 'react-icons/ri', 'react-icons/gr', 'react-icons/fc'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    fs: {
      strict: true,
    },
    // Pre-transform dependencies for faster cold start
    warmup: {
      clientFiles: [
        './src/pages/intro/Intro.jsx',
        './src/layouts/LayoutIntro.jsx',
        './src/pages/home/Home.jsx',
        './src/layouts/LayoutHome.jsx',
      ],
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      // Pre-bundle icon libraries for faster cold start
      'react-icons/fa',
      'react-icons/fi', 
      'react-icons/hi2',
      'react-icons/ai',
    ],
  },
})
