/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./assets/icons/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/atoms/**/*.{js,ts,jsx,tsx}",
    "./components/moleculs/**/*.{js,ts,jsx,tsx}",
    "./components/organism/**/*.{js,ts,jsx,tsx}",
    "./components/templates/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
