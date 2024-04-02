// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'chunk-name': ["@mui/x-data-grid","@emotion/react","@emotion/styled","@mui/material","@reduxjs/toolkit","material-ui-popup-state","react-hook-form","react-icons"],
        },
      },
    },
  },
};
