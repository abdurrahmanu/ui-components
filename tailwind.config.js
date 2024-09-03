/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,vue,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBlack: '#121212;',
      },
      screens: {
        'custom-md': '750px'
      }
    },
  },
  plugins: [],
};