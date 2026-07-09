/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coco': {
          'purple-deep': '#4A1E6D',
          'purple-main': '#6B3FA0',
          'purple-light': '#8B5CF6',
          'orange-gold': '#F59E0B',
          'orange-warm': '#FB923C',
          'yellow-bright': '#FCD34D',
          'cream-light': '#FEF3C7',
          'pink-soft': '#F9A8D4',
          'text-dark': '#1F1729',
          'text-light': '#FEF9EF',
        }
      },
      fontFamily: {
        'display': ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
        'heading': ['"Cormorant Garamond"', '"Noto Serif SC"', 'serif'],
        'body': ['"Nunito"', '"Noto Sans SC"', 'sans-serif'],
        'accent': ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'petal': 'fall linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
