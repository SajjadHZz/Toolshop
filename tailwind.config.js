const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#000000",
        background: "#FFFFFF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        IranSans: ['"IRANSans"', ...defaultTheme.fontFamily.sans],
        Lalezar: ['"Lalezar"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "fade-in": "fadeInLeft 300ms ease",
      },
      keyframes: {
        fadeInLeft: {
          "0%": {
            opacity: "0",
            "-webkit-transform": "translate3d(-100%, 0, 0)",
            transform: "translate3d(-100%, 0, 0)",
          },
          "100%": {
            opacity: "1",
            "-webkit-transform": "none",
            transform: "none",
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1352A2",
          "primary-content": "#ffffff",

          secondary: "#F7F8FB",
          "secondary-content": "#000805",

          accent: "#FFBF00",
          "accent-content": "#000000",

          neutral: "#d1d5db",
          "neutral-content": "#111827",

          "base-100": "#fcfcfc",
          "base-200": "#dbdbdb",
          "base-300": "#bbbbbb",
          "base-content": "#161616",

          info: "#38bdf8",
          "info-content": "#00090f",

          success: "#22c55e",
          "success-content": "#00140e",

          warning: "#ff8b00",
          "warning-content": "#160700",

          error: "#fc4355",
          "error-content": "#160102",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
