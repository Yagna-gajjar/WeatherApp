/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  important: '#root',
  lightMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text)'
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      },
    },
  },
  plugins: [],
}