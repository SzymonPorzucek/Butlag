/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.html', './src/**/*.js', './src/**/*.kit'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
