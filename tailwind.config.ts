import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  plugins: [],
} satisfies Config
