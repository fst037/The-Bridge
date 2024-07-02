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
      },
      margin: {
        '1/10': '10%',
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333333%',
        '1/2': '50%',
        '2/3': '66.666667%',
        '3/4': '75%',
        '4/5': '80%',
        '9/10': '90%',
      },
    },
    plugins: [],
  }
}
