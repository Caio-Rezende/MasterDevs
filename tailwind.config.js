/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,jsx?,tsx?}"],
  theme: {
    extend: {
      animation: {
        glow: "glow 5s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { textShadow: "0px 0px 0px white" },
          "20%": { textShadow: "-10px 0px 6px white" },
          "40%": { textShadow: "-10px 10px 6px white" },
          "60%": { textShadow: "10px 10px 6px white" },
          "80%": { textShadow: "10px 0px 6px white" },
          "100%": { textShadow: "0px 0px 0px white" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
