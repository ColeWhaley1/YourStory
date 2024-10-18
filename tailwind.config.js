/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			primary: ['istok-web',]
		},
  		colors: {
  			primary: '#508CA4',
  			secondary: '#FFCA3A',
  			tertiary: '#F26A8D',
  			success: '#8AC926',
  			failure: '#CC2936'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

