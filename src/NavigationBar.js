import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

let toggleNav = () => {
	let navEle = document.querySelector(".navigation");
	navEle.classList.toggle("max-sm:hidden");
	navEle.classList.toggle("max-md:hidden");
};

function NavigationBar() {
	return (
		<div className="">
			<div
				className="flex flex-col gap-[0.4rem] w-fit lg:hidden p-6 cursor-pointer"
				onClick={toggleNav}
			>
				<div className="w-7 h-[2.5px] bg-white"></div>
				<div className="w-5 h-[2.5px] bg-white"></div>
				<div className="w-3 h-[2.5px] bg-white"></div>
			</div>
			<div className="navigation bg-grey_bg h-full w-nav_width z-50 max-sm:w-8/12 fixed top-0 left-0 overflow-x-hidden max-sm:hidden max-md:hidden">
				<div
					className="text-2xl font-Sawarabi_Mincho text-white cursor-pointer lg:hidden absolute right-0 p-2"
					onClick={toggleNav}
				>
					X
				</div>
				<div className="flex flex-col space-y-nav_items_space max-sm:space-y-20 text-white text-center text-lg relative top-1/2 -translate-y-nav_translate">
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
		</div>
	);
}

export default NavigationBar;
