/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        somave: {
          red:        '#c62828',
          'red-dark': '#b71c1c',
          orange:     '#ff6f00',
          'orange-dk':'#e65100',
          yellow:     '#ffeb3b',
        }
      },
      fontFamily: {
        sans: ['Verdana', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
