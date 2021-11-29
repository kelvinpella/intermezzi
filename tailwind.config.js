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
      textColor: {
        // greyish: "#707070",
        // 33: "#333333",
        // fc: "#fcfafa",
        // "2e": "#2e2d2d",
        // f8: "#f8f7f7",
      },
      borderColor: {
        // greyish: "#707070",
        // borderHover: "#484f4f",
      },
      backgroundColor: {
        greyish: "#F1F1F1",
      },
      backgroundImage: {
        cover: 'url("/src/assets/cover.png")',
      },
      width: {
        // em: "1em",
      },
      height: {
        // em: "1em",
      },
      maxWidth: {
        40: "40%",
        50: "50%",70: "70%",
      },
      gridTemplateColumns: {
        // 2: "repeat(2, auto)",
        // 4: "repeat(4, auto)",
      },
      gridTemplateRows: {
        // 5: "repeat(5, auto)",
        // 4: "repeat(4, auto)",
      },
      borderRadius: {
        // circle: "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
