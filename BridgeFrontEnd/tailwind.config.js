/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8C5BF4',
        secondary: '#DED2F7',
        button1: '#00BCC6',
        button2: '#FF806E',
      }
    },
  },
  plugins: [],
}

