// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Playfair: ["Playfair Display", "serif"],
        WorkSans: ["Work Sans", " sans-serif"],
      },
      backgroundColor: {
        greyish: "#F1F1F1",
      },
      backgroundImage: {
        cover: 'url("/src/assets/cover.png")',
      },
      maxWidth: {
        40: "40%",
        50: "50%",
        70: "70%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
