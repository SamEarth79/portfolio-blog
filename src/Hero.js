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
			<Experience></Experience>
			<Contact></Contact>
		</div>
	);
}

export default Hero;
