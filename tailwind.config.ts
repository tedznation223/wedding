import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50:  '#fdfcf8',
          100: '#faf6ee',
          200: '#f4ecd8',
          300: '#ebdcbd',
          400: '#dfc49a',
          500: '#d4ab79',
        },
        blush: {
          50:  '#fdf5f4',
          100: '#fbe8e5',
          200: '#f7cfc9',
          300: '#f0aca3',
          400: '#e57f72',
          500: '#d4574a',
        },
        sage: {
          50:  '#f4f7f4',
          100: '#e2ebe3',
          200: '#c4d6c6',
          300: '#9bb99e',
          400: '#6e9872',
          500: '#4d7a52',
        },
        gold: {
          300: '#e8d07a',
          400: '#d4b84a',
          500: '#b8962a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
