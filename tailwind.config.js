/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,vue,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: {
    pattern: '/bg-(red|green|blue|yellow|pink|gray|zinc|neutral|brown|yellow|slate|stone|orange|amber|lime|emerald|cyan|sky|indigo|violet|purple|fuchsia|rose)-(100|200|300|400|500|600|700|800|900)'
  },
  plugins: [],
};