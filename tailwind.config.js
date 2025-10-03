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
            white: "var(--white)",
            background: "var(--background)",
            main: "var(--main-text)",
            addition: "var(--addition-text)",
            accent: "var(--accent-color)",
            accentLight: "var(--accent-color-light)",
            accentSuperLight: "var(--accent-color-super-light)",
            accentDark: "var(--accent-color-dark)",
            accentHover: "var(--accent-color-hover)",
            red: "var(--red)",
            placeholder: "var(--placeholder)",
            icon: "var(--icon)",
            table: "var(--table)",
            strokeTable: "var(--stroke-table)",
            success: "var(--success)",
            warning: "var(--warning)",
            strokeInput: "var(--stroke---input)",
          },
  
      },
    },
    plugins: [],
  }