/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          fontFamily: {
            primary: ["Quicksand", "sans-serif"],
            secondary: ["Poppins", "sans-serif"],
            third: ["Urbanist", "sans-serif"],
          },
          colors: {
            white: "#fefefe",
            background: "#f9f1eb",
            main: "#202020",
            addition: "#525252",
            accent: "#234d2e",
            accentLight: "#7cb184",
            accentSuperLight: "#def2d6",
            accentDark: "#1c3e24",
            accentHover: "#2d6b41",
            red: "#d00",
            placeholder: "#818181",
            icon: "#404040",
            table: "#d2e7d3",
            strokeTable: "#ece2da",
            success: "#299c4e",
            warning: "#ee9229",
            strokeInput: "rgba(102, 102, 102, 0.35)",
          },
  
      },
    },
    plugins: [],
  }