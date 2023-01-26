import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHtml5,
	faJs,
	faSpotify,
	faReact,
	faNodeJs,
	faCss3Alt,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./ProjectCard";

function Projects() {
	return (
		<div
			id="projects"
			className="projects max-sm:mt-20 h-screen w-full flex flex-col justify-center max-w-screen-2xl"
		>
			<div className="container bg-purple-pattern h-4/6 p-4 w-full flex lg:justify-around max-sm:gap-10 overflow-x-scroll">
				<div className="h-full lg:basis-1/4 max-sm:min-w-[16rem] flex flex-col border p-2 text-white bg-black_bg group">
					<div className="h-1/2 group-hover:h-1/3 flex flex-col justify-end transition-all duration-300">
						<p className="text-gray-500 text-7xl group-hover:text-8xl group-hover:text-white transition-all duration-300">01</p>
						<h1 className="font-Sawarabi_Mincho text-3xl">
							circlefy
						</h1>
					</div>
					<div className="h-1/2 group-hover:h-3/4 border-t relative transition-all duration-300">
						<div className="techstack w-full flex justify-start">
							<div className="flex flex-col group-hover:px-px">
								<FontAwesomeIcon
									icon={faHtml5}
									className="text-orange-500 h-7 py-2 px-1"
								/>
								<p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
									HTML
								</p>
							</div>
							<div className="flex flex-col group-hover:px-px">
								<FontAwesomeIcon
									icon={faCss3Alt}
									className="text-blue-500 h-7 py-2 px-1"
								/>
								<p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
									CSS
								</p>
							</div>
							<div className="flex flex-col group-hover:px-px">
								<FontAwesomeIcon
									icon={faJs}
									className="text-yellow-300 h-7 py-2 px-1"
								/>
								<p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
									JS
								</p>
							</div>
							<div className="flex flex-col group-hover:px-px">
								<FontAwesomeIcon
									icon={faSpotify}
									className="text-green-500 h-7 py-2 px-1"
								/>
								<p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
									Spotify API
								</p>
							</div>
						</div>
						<div className="hidden opacity-0 group-hover:block group-hover:opacity-100 group-hover:mt-8 transition-all duration-700">
						Circlefy is a tool that lets user show off their top spotify artists. Circlefy uses the spotify API as it's backend to get user's data after OAuth authentication and authorization.
						</div>
						<div className="links flex w-full justify-end absolute bottom-0">
							<a href="https://circlefy.onrender.com/" target="_blank" rel="noreferrer">
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								className="text-gray-400 h-7 py-1 px-1"
							/></a>
							<a href="https://github.com/SamEarth79/circlefy" target="_blank" rel="noreferrer">
							<FontAwesomeIcon
								icon={faGithub}
								className="text-gray-400 h-7 py-1 px-1"
							/></a>
						</div>
					</div>
				</div>
				<div className="h-full lg:basis-1/4 max-sm:min-w-[16rem] flex flex-col border p-2 text-white bg-black_bg group">
					<div className="h-1/2 group-hover:h-1/3 flex flex-col justify-end transition-all duration-300">
						<p className="text-gray-500 text-7xl">01</p>
						<h1 className="font-Sawarabi_Mincho text-3xl">
							circlefy
						</h1>
					</div>
					<div className="h-1/2 group-hover:h-3/4 border-t relative transition-all duration-300">
						<div className="techstack w-full flex justify-start">
							<FontAwesomeIcon
								icon={faHtml5}
								className="text-orange-500 h-7 py-2 px-1"
							></FontAwesomeIcon>
							<FontAwesomeIcon
								icon={faCss3Alt}
								className="text-blue-500 h-7 py-2 px-1"
							/>
							<FontAwesomeIcon
								icon={faJs}
								className="text-yellow-300 h-7 py-2 px-1"
							/>
							<FontAwesomeIcon
								icon={faSpotify}
								className="text-green-500 h-7 py-2 px-1"
							/>
						</div>
						<div className="hidden opacity-0 group-hover:block group-hover:opacity-100 transition-all duration-700">
							circlefy is a tool made by me
						</div>
						<div className="links flex w-full justify-end absolute bottom-0">
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								className="text-gray-400 h-7 py-1 px-1"
							/>
							<FontAwesomeIcon
								icon={faGithub}
								className="text-gray-400 h-7 py-1 px-1"
							/>
						</div>
					</div>
				</div>
				<div className="h-full lg:basis-1/4 max-sm:min-w-[16rem] flex flex-col border p-2 text-white bg-black_bg group">
					<div className="h-1/2 group-hover:h-1/3 flex flex-col justify-end transition-all duration-300">
						<p className="text-gray-500 text-7xl">01</p>
						<h1 className="font-Sawarabi_Mincho text-3xl">
							circlefy
						</h1>
					</div>
					<div className="h-1/2 group-hover:h-3/4 border-t relative transition-all duration-300">
						<div className="techstack w-full flex justify-start">
							<FontAwesomeIcon
								icon={faHtml5}
								className="text-orange-500 h-7 py-2 px-1"
							></FontAwesomeIcon>
							<FontAwesomeIcon
								icon={faCss3Alt}
								className="text-blue-500 h-7 py-2 px-1"
							/>
							<FontAwesomeIcon
								icon={faJs}
								className="text-yellow-300 h-7 py-2 px-1"
							/>
							<FontAwesomeIcon
								icon={faSpotify}
								className="text-green-500 h-7 py-2 px-1"
							/>
						</div>
						<div className="hidden opacity-0 group-hover:block group-hover:opacity-100 transition-all duration-700">
							circlefy is a tool made by me
						</div>
						<div className="links flex w-full justify-end absolute bottom-0">
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								className="text-gray-400 h-7 py-1 px-1"
							/>
							<FontAwesomeIcon
								icon={faGithub}
								className="text-gray-400 h-7 py-1 px-1"
							/>
						</div>
					</div>
				</div>
				<ProjectCard title={"blog"}></ProjectCard>
			</div>
		</div>
	);
}

export default Projects;
