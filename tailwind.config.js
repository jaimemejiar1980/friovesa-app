/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/modules/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003b7a",
        "primary-content": "#7abaff",
        "primary-dark": "#002247",
        "primary-light": "#0054ad",

        "in-stock": "#3fc1be",
        "out-of-stock": "#e74c3c",
        "sale-off-product": "#C7222B",
        "back-order": "#eaa601",

        secondary: "#228B22",
        "secondary-content": "#bdefbd",
        "secondary-dark": "#186218",
        "secondary-light": "#2cb42c",

        background: "#fff",
        foreground: "#fbfbfb",
        border: "#dddfe2",

        "background-dark": "#18191b",
        "foreground-dark": "#232629",
        "border-dark": "#3b4045",

        copy: "#232629",
        "copy-light": "#5e666e",
        "copy-lighter": "#848c95",

        "copy-dark": "#fbfbfb",
        "copy-dark-light": "#d6d9dc",
        "copy-dark-lighter": "#9fa6ac",

        success: "#007a00",
        warning: "#7a7a00",
        error: "#7a0000",

        "success-content": "#7aff7a",
        "warning-content": "#ffff7a",
        "error-content": "#ff7a7a",
      },
    },
    fontFamily: {
      roboto: ["Roboto-Regular", "sans-serif"],
      raleway: ["Raleway-Regular", "sans-serif"],
    },
  },
  plugins: [],
};
