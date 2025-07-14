/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Add this line to enable dark mode
  content: ['./src/**/*.{tsx,css}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: [
        'Monaco',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    container: {
      center: true,
      screens: {
        sm: '50rem',
      },
    },
    extend: {
      colors: {
        slate: {
          850: 'hsl(222deg 47% 16%)',
        },
        primary: '#5fc3e7',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },

  },
  plugins: [],
};