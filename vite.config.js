import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: must match repo URL exactly (e.g. .../brainbuzz/ or .../BrainBudz/)
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/brainbuzz/' : '/',
  plugins: [react()],
})
