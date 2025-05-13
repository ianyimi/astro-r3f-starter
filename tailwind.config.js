/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#ffffff",
        dark: "#0e141b"
      },
    },
  },
  plugins: [require("nightwind")],
};