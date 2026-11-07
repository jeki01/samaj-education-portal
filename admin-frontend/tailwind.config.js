// tailwind.config.js
const { heroui } = require("@heroui/react");

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend:{
      colors:{
        "primary":"#333399"
      }
    }
  },
  darkMode: "class",
  plugins: [heroui()]
}