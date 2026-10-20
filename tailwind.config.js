/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          bg: '#F8FBFF',
          bgSecondary: '#EEF5FF',
          iceBlue: '#CFE5FF',
          skyBlue: '#8DBBFF',
          lavender: '#DCD6FF',
          blushPink: '#FFE0EB',
          pearlWhite: '#FFFFFF',
          textPrimary: '#202642',
          textSecondary: '#78809B',
          accentBlue: '#648BFF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(100, 139, 255, 0.08), 0 2px 8px 0 rgba(220, 214, 255, 0.15)',
        'glass-hover': '0 16px 40px 0 rgba(100, 139, 255, 0.16), 0 4px 12px 0 rgba(220, 214, 255, 0.25)',
        'glow-soft': '0 0 30px rgba(141, 187, 255, 0.35)',
        'glow-pink': '0 0 30px rgba(255, 224, 235, 0.45)',
        'subtle': '0 10px 30px -10px rgba(32, 38, 66, 0.05)',
      },
      borderRadius: {
        'xl2': '22px',
        'xl3': '28px',
        'xl4': '36px',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-gentle': 'floatGentle 4.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
