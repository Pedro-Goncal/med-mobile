/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#374763", //#0F172A
        secondary: "#48BAD5",
        backgroundLight: "#FAFAFA",
        backgroundDark: "#0F172A", //#212121 //#2D2D2D
        green: "#4CAF50",
        yellow: "#FFC107",
        blue: "#2196F3",
        red: "#F44336",
        gray: "#9E9E9E",
      },
    },
  },
};
