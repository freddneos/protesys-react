/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",
        secondary: "#34A853",
        neutral: "#5F6368",
        light: "#F5F9FF",
        background: "#FFFFFF",
        border: "#E0E0E0",
        error: "#EA4335",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
}
