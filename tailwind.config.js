/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./App.tsx",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Mulish': ['Mulish', 'sans-serif'],
        'Lato': ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

