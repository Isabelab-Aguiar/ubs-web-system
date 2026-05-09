import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FB',
          100: '#D4E9F7',
          200: '#A9D3EF',
          300: '#7FBDE7',
          400: '#54A7DF',
          500: '#1351B4',
          600: '#0F4193',
          700: '#0C326F',
          800: '#08224A',
          900: '#041125',
          DEFAULT: '#1351B4',
        },
        accent: {
          50: '#E6F7F5',
          100: '#CCEFEB',
          400: '#33BFAF',
          500: '#00AF9B',
          600: '#008C7C',
          700: '#00695D',
          DEFAULT: '#00AF9B',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#EDEFF2',
          200: '#DCDFE3',
          300: '#ADADAD',
          400: '#888D94',
          500: '#6C717A',
          600: '#565C65',
          700: '#43464A',
          800: '#2E2F31',
          900: '#1C1D1F',
        },
        success: {
          50: '#D4EDDA',
          500: '#168821',
          700: '#0F5C16',
          DEFAULT: '#168821',
        },
        warning: {
          50: '#FFF9DB',
          500: '#FFCD07',
          700: '#B38F05',
          DEFAULT: '#FFCD07',
        },
        danger: {
          50: '#F8D7DA',
          500: '#E52207',
          700: '#A01805',
          DEFAULT: '#E52207',
        },
        info: {
          50: '#D4E3F7',
          500: '#155BCB',
          700: '#0E3D8A',
          DEFAULT: '#155BCB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8F9FA',
          subtle: '#EDEFF2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.07)',
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        modal: '0 20px 40px rgba(0,0,0,0.15)',
        strong: '0 8px 32px rgba(0,0,0,0.16)',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      maxWidth: {
        container: '1200px',
      },
      height: {
        header: '64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'slide-down': 'slideDown 0.25s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 0.85s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      screens: {
        xs: '375px',
        sm: '428px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
        touch: '44px',
      },
    },
  },
  plugins: [],
};

export default config;
