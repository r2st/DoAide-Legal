/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#F0B429',
          dark: '#1a1a2e',
        },
      },
    },
  },
  plugins: [],
};
