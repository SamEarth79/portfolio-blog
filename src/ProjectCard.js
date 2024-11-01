import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = (props) => {
    let card = useRef(null);

    const gsapAnimations = () => {
        gsap.fromTo(
            card,
            { x: 200, scrollTrigger: card },
            {
                x: 0,
                scrollTrigger: card,
                duration: 2,
                ease: "expo",
            }
        );
    };

    useEffect(() => {
        gsapAnimations();
    }, []);

    return (
        <div
            ref={(el) => (card = el)}
            className="h-full lg:w-1/4 max-sm:min-w-[16rem] flex flex-col border p-2 text-white bg-black_bg group"
        >
            <div className="h-1/2 group-hover:h-1/3 flex flex-col justify-end transition-all duration-300">
                <p className="text-gray-500 text-7xl group-hover:text-8xl group-hover:text-white transition-all ease-in duration-300">
                    {props.id}
                </p>
                <h1 className="font-Sawarabi_Mincho text-3xl">{props.title}</h1>
            </div>
            <div className="h-1/2 group-hover:h-3/4 border-t relative transition-all duration-300">
                <div className="techstack w-full flex justify-start">
                    {props.tech.map((tech) => {
                        if (tech[3] === "firebase") {
                            return (
                                <div className="flex flex-col group-hover:px-px">
                                    <img
                                        src={
                                            require("./stock/icons8-firebase-480.svg")
                                                .default
                                        }
                                        alt="firebase_logo"
                                        className="h-7 my-2 mx-1"
                                    />
                                    <p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
                                        {tech[1]}
                                    </p>
                                </div>
                            );
                        } else if (tech[3] === "redux") {
                            return (
                                <div className="flex flex-col group-hover:px-px">
                                    <img
                                        src={
                                            require("./stock/redux.svg").default
                                        }
                                        alt="firebase_logo"
                                        className="h-6 my-2 mb-3 mx-1"
                                    />
                                    <p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
                                        {tech[1]}
                                    </p>
                                </div>
                            );
                        } else if(tech[3] === "nextjs") {
                            return (
                                <div className="flex flex-col group-hover:px-px">
                                    <img
                                        src={
                                            require("./stock/icons8-next.js.svg").default
                                        }
                                        alt="firebase_logo"
                                        className="h-6 my-2 mb-3 mx-1"
                                    />
                                    <p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
                                        {tech[1]}
                                    </p>
                                </div>
                            )
                        } else if(tech[3] === "mongodb") {
                            return (
                                <div className="flex flex-col group-hover:px-px">
                                    <img
                                        src={
                                            require("./stock/mongodb-svgrepo-com.svg").default
                                        }
                                        alt="firebase_logo"
                                        className="h-6 my-2 mb-3 mx-1"
                                    />
                                    <p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
                                        {tech[1]}
                                    </p>
                                </div>
                            )
                        } else {
                            return (
                                <div className="flex flex-col group-hover:px-px">
                                    {
                                        <FontAwesomeIcon
                                            icon={tech[0]}
                                            className={`${tech[2]} h-7 py-2 px-1`}
                                        />
                                    }
                                    <p className="bg-gray-600 p-1 rounded-md text-xs hidden group-hover:block text-center">
                                        {tech[1]}
                                    </p>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="hidden opacity-0 group-hover:block group-hover:opacity-100 group-hover:mt-8 transition-all duration-700">
                    {props.desc}
                </div>
                <div className="links flex w-full justify-end absolute bottom-0">
                    <a
                        href={`${props.weblink}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="text-gray-400 h-7 py-1 px-1"
                        />
                    </a>
                    <a
                        href={`${props.githublink}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faGithub}
                            className="text-gray-400 h-7 py-1 px-1"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
