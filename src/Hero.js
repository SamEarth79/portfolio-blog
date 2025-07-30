import React from "react";
import Contact from "./Contact";
import Experience from "./Experience";
import Home from "./Home";
import Projects from "./Projects";

function Hero() {
	return (
		<div className="lg:ml-nav_width scroll-smooth ">
			<Home></Home>
			<Projects></Projects>
			<h1 className="text-white text-5xl p-5 font-medium -mb-24 mt-10 text-center">Experience</h1>
			<Experience></Experience>
			<Contact></Contact>
		</div>
	);
}

export default Hero;
