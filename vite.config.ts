import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: [
      // eslint-disable-next-line no-undef
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
