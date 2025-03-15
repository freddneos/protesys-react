/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        secondary: ['Roboto', 'Arial', 'sans-serif']
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["corporate", "dark"],
    darkTheme: "dark",
  },
}
