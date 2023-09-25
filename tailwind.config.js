/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-white': '#ffffff2b',
        'dark-grey': '#202123',
        'light-grey': '#353740',
      },
      fontFamily: {
        'Rubik': ['Rubik',' sans-serif '],     
      },
     
      screens: {
        'sm': {'max': '576px'},
        'md': {'max': '768px'},
        'lg': {'max': '1024px'},
        'xl': {'max': '1280px'},
        'sm-min': {'min': '576px'},
      },
     
    },
  },
  plugins: [require('daisyui')],
};
