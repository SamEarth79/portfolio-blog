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
				accent: "#64181E",
				black_bg: "#A08D71",
				grey_bg: "#8B7A63",
				grey_bg_trans: "#8B7A6300",
				card_bg: "#D7C7A8",
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
				meeeee: "url('/public/meee.png')",
			},
		},
	},
	plugins: [],
};
