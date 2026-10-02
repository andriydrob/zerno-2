/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        slate: {
          DEFAULT: '#18181B',
          soft: '#232327',
          border: '#2F2F34'
        },
        cream: {
          DEFAULT: '#F5F5F4',
          dim: '#E7E5E2'
        },
        lime: {
          DEFAULT: '#A3E635',
          dim: '#84CC16',
          glow: 'rgba(163, 230, 53, 0.35)'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '75rem'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(163, 230, 53, 0.4), 0 0 24px rgba(163, 230, 53, 0.25)'
      }
    }
  },
  plugins: []
};
