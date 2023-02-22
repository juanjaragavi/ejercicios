/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
			fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
				Raleway: ["Raleway", "sans-serif"],
				Montserrat: ["Montserrat", "sans-serif"],
			},
			colors: {
				primary: '#7611a6',
				secondary: '#FFFFFF',
				light: '#c561f6',
			},
		},
  },
  plugins: [],
}
