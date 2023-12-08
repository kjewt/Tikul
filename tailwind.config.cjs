module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25em",
      "5xl": "3rem",
    },
    extend: {
      lineClamp: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8FD7D9",
          secondary: "#CFA5BF",
          accent: "#9ca3af",
          neutral: "#98999B",
          "base-100": "#ffffff",
          info: "#6b7280",
          success: "#F3C7CC",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
