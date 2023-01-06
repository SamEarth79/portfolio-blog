import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function NavigationBar() {
	return (
		<div className="bg-grey_bg h-full w-nav_width fixed top-0 left-0 z-10 overflow-x-hidden">
			<div className="flex flex-col space-y-nav_items_space text-white text-center text-lg relative top-1/2 -translate-y-nav_translate">
				<h1>
					<a href="#home">Home</a>
				</h1>
				<h1>
					<a href="#projects">Projects</a>
				</h1>
				<h1>
					<a href="#experience">Experience</a>
				</h1>
				<h1>
					<a href="#contact">Contact</a>
				</h1>
				<div className="flex justify-center space-x-3.5 pt-10 text-accent text-xl">
					<FontAwesomeIcon icon={faEnvelope} />
					<FontAwesomeIcon icon={faLinkedin} />
					<FontAwesomeIcon icon={faGithub} />
				</div>
			</div>
		</div>
	);
}

export default NavigationBar;
