/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#1B1B1C',
          white: '#FFFFFF',
          gray: '#F2F2F2',
          yellow: '#FFD230',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
