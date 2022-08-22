/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark1: "#2E3440",
          dark2: "#3B4252",
          dark3: "#434C5E",
          dark4: "#4C566A",
          light1: "#D8DEE9",
          light2: "#E5E9F0",
          light3: "#ECEFF4",
          blue1: "#8FBCBB",
          blue2: "#88C0D0",
          blue3: "#81A1C1",
          mauve: "#B48EAD",
          red: "#BF616A",
          orange: "#D08770",
          yellow: "#EBCB8B",
          green: "#A3BE8C",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
