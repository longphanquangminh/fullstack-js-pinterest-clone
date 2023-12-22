import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx,js,ts}'],
    exclude: ['node_modules', '.git']
  },
  attributify: true
})
