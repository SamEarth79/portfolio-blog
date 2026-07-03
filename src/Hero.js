import React from "react";
import Contact from "./Contact";
import Experience from "./Experience";
import Home from "./Home";
import Projects from "./Projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faCertificate, faTrophy } from "@fortawesome/free-solid-svg-icons";

function Hero() {
	return (
		<div className="lg:ml-nav_width scroll-smooth ">
			<Home></Home>
			<Projects></Projects>
			<h1 className="text-accent text-5xl p-5 font-medium mb-10 mt-10 text-center">Experience</h1>
			<Experience></Experience>
			<h1 className="text-accent text-5xl p-5 font-medium -mb-24 mt-10 text-center" id="certifications">Certifications</h1>
			<div className="lg:h-screen w-full flex justify-center items-center">
				<div className="w-10/12 grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="bg-grey_bg border rounded-xl p-8 flex items-start gap-6 group hover:border-accent transition-all duration-300">
						<FontAwesomeIcon icon={faCertificate} className="text-accent text-5xl mt-1" />
						<div>
							<h3 className="text-white text-2xl font-Sawarabi_Mincho mb-2">Microsoft Certified: Azure Cloud</h3>
							<p className="text-gray-400">AZ-900 Fundamentals — Microsoft</p>
						</div>
					</div>
					<div className="bg-grey_bg border rounded-xl p-8 flex items-start gap-6 group hover:border-accent transition-all duration-300">
						<FontAwesomeIcon icon={faTrophy} className="text-accent text-5xl mt-1" />
						<div>
							<h3 className="text-white text-2xl font-Sawarabi_Mincho mb-2">SAE India AeroDesign Aircraft Competition</h3>
							<p className="text-gray-400">Winner — Aerothon</p>
						</div>
					</div>
					<div className="bg-grey_bg border rounded-xl p-8 flex items-start gap-6 group hover:border-accent transition-all duration-300">
						<FontAwesomeIcon icon={faAward} className="text-accent text-5xl mt-1" />
						<div>
							<h3 className="text-white text-2xl font-Sawarabi_Mincho mb-2">Project Co-ordinator SkillPath</h3>
							<p className="text-gray-400">Coursera</p>
						</div>
					</div>
					<div className="bg-grey_bg border rounded-xl p-8 flex items-start gap-6 group hover:border-accent transition-all duration-300">
						<FontAwesomeIcon icon={faAward} className="text-accent text-5xl mt-1" />
						<div>
							<h3 className="text-white text-2xl font-Sawarabi_Mincho mb-2">Business Analysis Fundamentals</h3>
							<p className="text-gray-400">Udemy</p>
						</div>
					</div>
				</div>
			</div>
			<Contact></Contact>
		</div>
	);
}

export default Hero;
