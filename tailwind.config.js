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
  safelist: [
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
  ],
    // pattern: /bg-(red|green|blue|yellow|pink|gray|zinc|neutral|brown|slate|stone|orange|amber|lime|emerald|cyan|sky|indigo|violet|purple|fuchsia|rose)-(100|200|300|400|500|600|700|800|900)/,
  plugins: [],
};