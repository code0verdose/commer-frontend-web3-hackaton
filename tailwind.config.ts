import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      colors: {
        background: '#050505',
        ui: '#0F0F0F',
        brand: '#4C60E7',

        black: '#000000',
        white: '#FFFFFF',

        green: '#80E84D',
        red: '#E84D54',
      },
      screens: {
        xxs: '376px',
      },
      spacing: {
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      animation: {},
    },
  },
  plugins: [],
} satisfies Config
