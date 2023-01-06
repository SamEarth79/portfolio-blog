/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				Montserrat: ["Montserrat", "sans-serif"],
				Sawarabi_Mincho: ["Sawarabi Mincho", "sans-serif"],
			},
			colors: {
				accent: "#8E05C2",
				black_bg: "#131313",
				grey_bg: "#1B1B1B",
				grey_bg_trans: "#1B1B1B00",
				white_trans: "#ffffff00",
			},
			spacing: {
				nav_width: "10%",
				nav_items_space: "50%",
				nav_bottom: "20%",
				nav_translate: "40%",
				about_me_translate: "30%",
				arc_innercircle: "90%",
			},
			backgroundImage: {
				"purple-pattern": "url('/public/purple_liquid.jpeg')",
				meeeee: "url('/public/meee.png')",
			},
		},
	},
	plugins: [],
};
