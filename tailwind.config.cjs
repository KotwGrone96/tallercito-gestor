/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bglogin: "url('./src/assets/bglogin.jpg')",
      },
      backdropBlur: {
        xs: '1px',
      },
    },
  },
  plugins: [],
};
