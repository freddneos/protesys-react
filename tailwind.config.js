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
    themes: ["cupcake","corporate","winter", "dark","bumblebee" ,  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", 
      "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", 
      "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", 
      "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ],
    darkTheme: "dark",
  },
}
