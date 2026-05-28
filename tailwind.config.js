/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          300: '#6E86A0',
          400: '#526F8C',
          500: '#355879',
          600: '#234969',
          700: '#14395A'
        },
        mist: {
          50: '#F8FAFC',
          100: '#EEF2F6',
          200: '#DDE6EF'
        },
        ice: {
          50: '#EEF8FF',
          100: '#DDF2FF',
          200: '#C9ECFF',
          300: '#8EDAFF',
          400: '#42C2FF',
          500: '#14A7EC',
          600: '#087CB8',
          700: '#0C5F8A'
        },
        glacial: '#EEF8FF',
        gold: {
          100: '#FFF2C9',
          300: '#FFE07A',
          400: '#F6C94B',
          500: '#D9A642'
        },
        aqua: {
          50: '#EAFBF7',
          100: '#CFF7EE',
          200: '#A7F0E1',
          400: '#35D5BC',
          500: '#04B7B0'
        },
        motion: {
          500: '#006DF0',
          600: '#075CC6'
        }
      },
      boxShadow: {
        vimo: '0 24px 70px rgba(22, 56, 96, 0.13)',
        soft: '0 14px 36px rgba(22, 56, 96, 0.09)',
        card: '0 30px 80px rgba(20, 57, 90, 0.14)',
        glow: '0 18px 50px rgba(20, 167, 236, 0.22)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'PingFang TC', 'Noto Sans TC', 'sans-serif']
      }
    }
  },
  plugins: []
};
