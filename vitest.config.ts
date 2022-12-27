/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    silent: false,
    coverage: {
        provider: "istanbul"
    }
  },
})