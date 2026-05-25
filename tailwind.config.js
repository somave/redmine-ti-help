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
          blue: '#1a3a6b',
          light: '#2563eb',
        }
      },
    },
  },
  plugins: [],
}

