/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '128': '45rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

