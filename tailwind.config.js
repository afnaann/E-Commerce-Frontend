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
      colors:{
        customColor:'#fbf5ec',
        hoverColor:'#f1ece5',
        gray1: '#f5f5f5',
        gray2: '#e5e5e5',
        gray3: '#d5d5d5',
        gray4: '#c5c5c5',
        gray5: '#b5b5b5',
      },
      fontFamily: {
        manrope: ['Manrope','sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '14px': '14px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
