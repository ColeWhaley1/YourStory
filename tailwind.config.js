/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#508CA4',
        secondary: '#FFCA3A',
        tertiary: '#F26A8D',
        success: '#8AC926',
        failure: '#CC2936',
      }
    },
  },
  plugins: [],
}

