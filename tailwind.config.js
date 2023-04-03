/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  safelist: [
    {
      pattern: /text-(red|green|blue|yellow)/,
      variants: ["group-hover"],
    },
  ],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
