/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,tsx}'
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#77E7D9',
        accent: '#F27465',
        aqua: '#00FFFF',
        coral: '#FF7F50',
      },
    },
  },
  plugins: [],
};
