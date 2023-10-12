/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors : {
				"main-blue" : "#16ABF8"
			}
		}
	},

	plugins: []
};

module.exports = config;
