import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// User site (agustin-1998.github.io) is served from the domain root.
// `--mode preview` builds a relocatable copy with every asset inlined, used for a one-file preview.
export default defineConfig(({ mode }) => ({
  base: mode === 'preview' ? './' : '/',
  plugins: [vue()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    outDir: mode === 'preview' ? 'dist-preview' : 'dist',
    assetsInlineLimit: mode === 'preview' ? 10_000_000 : 4096,
  },
}))
