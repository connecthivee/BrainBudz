import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: must match repo URL exactly — https://connecthivee.github.io/BrainBudz/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/BrainBudz/' : '/',
  plugins: [react()],
})
