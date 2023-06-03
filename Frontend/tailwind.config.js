/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Montserrat: "Montserrat",
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("tailwind-scrollbar"), require("daisyui")],
};
