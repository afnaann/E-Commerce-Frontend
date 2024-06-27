/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        128: "32rem", // Adds a custom width of 32rem (512px)
        144: "36rem", // Adds a custom width of 36rem (576px)
        192: "48rem", // Adds a custom width of 48rem (768px)
      },
      height: {
        128: "32rem", // Adds a custom width of 32rem (512px)
        144: "36rem", // Adds a custom width of 36rem (576px)
        192: "48rem", // Adds a custom width of 48rem (768px)
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
