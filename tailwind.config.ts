import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#1351b4',
          600: '#1045a0',
          700: '#0d3a8c',
        },
        secondary: {
          500: '#00af9b',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
