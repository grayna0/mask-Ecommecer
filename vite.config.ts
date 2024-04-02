// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'chunk-name': ['module-name'],
        },
      },
    },
  },
};

