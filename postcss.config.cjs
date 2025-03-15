// postcss configuration updated to use @tailwindcss/postcss
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer')
  ],
};
