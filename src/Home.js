import React, { useEffect } from "react";
import {
    faHtml5,
    faCss3Alt,
    faJs,
    faReact,
    faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { useRef } from "react";

function Home() {
    function scrolled(event) {
        // alert("scrolled");

        scale += event.deltaX * 0.1;
        const scrollMax = 200;
        scale = Math.min(Math.max(0, scale), scrollMax);

        console.log(Math.trunc(scale / 2) + "%");

        const p = document.getElementById("progress");
        p.style.width = Math.trunc(scale / 2) + "%";
        const scrollSegment = scrollMax / 4;
        const breaks = [
            scrollSegment,
            scrollSegment * 2,
            scrollSegment * 3,
            scrollSegment * 4,
        ];

        if (scale > scrollSegment) {
            const scroll_ind = document.querySelector(".scroll-indicator");
            scroll_ind.style = "opacity: 0";
        }
        // console.log(scale);

        if (scale < breaks[0]) {
            console.log(1);
            // document.querySelector(".about1").classList.remove("hidden");
            // document.querySelector(".about2").classList.add("hidden");
            // document.querySelector(".about3").classList.add("hidden");
            // document.querySelector(".about4").classList.add("hidden");
            document.querySelector(".about1").style = "opacity: 100;";
            document.querySelector(".about2").style = "opacity: 0;";
            document.querySelector(".about3").style = "opacity: 0;";
            document.querySelector(".about4").style = "opacity: 0;";
        } else if (scale < breaks[1]) {
            console.log(2);
            // document.querySelector(".about1").classList.add("hidden");
            // document.querySelector(".about2").classList.remove("hidden");
            // document.querySelector(".about3").classList.add("hidden");
            // document.querySelector(".about4").classList.add("hidden");
            document.querySelector(".about1").style = "opacity: 0;";
            document.querySelector(".about2").style = "opacity: 100;";
            document.querySelector(".about3").style = "opacity: 0;";
            document.querySelector(".about4").style = "opacity: 0;";
        } else if (scale < breaks[2]) {
            console.log(3);
            // document.querySelector(".about1").classList.add("hidden");
            // document.querySelector(".about2").classList.add("hidden");
            // document.querySelector(".about3").classList.remove("hidden");
            // document.querySelector(".about4").classList.add("hidden");
            document.querySelector(".about1").style = "opacity: 0;";
            document.querySelector(".about2").style = "opacity: 0;";
            document.querySelector(".about3").style = "opacity: 100;";
            document.querySelector(".about4").style = "opacity: 0;";
        } else {
            console.log(4);
            // document.querySelector(".about1").classList.add("hidden");
            // document.querySelector(".about2").classList.add("hidden");
            // document.querySelector(".about3").classList.add("hidden");
            // document.querySelector(".about4").classList.remove("hidden");
            document.querySelector(".about1").style = "opacity: 0;";
            document.querySelector(".about2").style = "opacity: 0;";
            document.querySelector(".about3").style = "opacity: 0;";
            document.querySelector(".about4").style = "opacity: 100;";
        }
    }

    let scale = 1;

    const handleOnMoouseMove = (e) => {
        const { currentTarget: target } = e;

        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    for (const board of document.querySelectorAll(".board")) {
        board.onmousemove = (e) => handleOnMoouseMove(e);
    }

    function myFunction() {
        // console.log("SSSS");
        // const aboutdiv = document.querySelector(".aboutdiv");
        // aboutdiv.onwheel = scrolled;
        // var leftOffset = document.getElementById("about").scrollLeft;
        // console.log(leftOffset);
        // const breaks = [380, 760, 1140];
        // if (leftOffset < breaks[0]) {
        // 	console.log(0);
        // 	document.querySelector(".about1").classList.remove("hidden");
        // } else if (leftOffset < breaks[1]) {
        // 	document.querySelector(".about2").classList.remove("hidden");
        // 	console.log(1);
        // } else if (leftOffset < breaks[2]) {
        // 	document.querySelector(".about3").classList.remove("hidden");
        // 	console.log(2);
        // } else {
        // 	document.querySelector(".about4").classList.remove("hidden");
        // 	console.log(3);
        // }
    }

    let aboutNav = () => {};

    let styleBuildStuff = () => {
        // let angle = 45;
        let angle = 135 / 20;
        let rot = 67.5;
        var elemWidth = document.querySelector(".ellipse").clientWidth;
        console.log(elemWidth);
        for (const letter of document.querySelectorAll(".arcText")) {
            letter.style = `transform: rotate(${rot}deg) translate(0px, ${
                elemWidth * 0.38
            }px);`;
            rot -= angle;
            console.log(rot);
        }
    };

    let ellipse1 = useRef(null);
    let ellipse3 = useRef(null);
    let purplebg = useRef(null);

    let gsapAnimations = () => {
        gsap.fromTo(
            ellipse1,
            { x: -200, ease: "expo" },
            { x: 0, ease: "expo", duration: 2 }
        );
        gsap.fromTo(
            ellipse3,
            { x: 200, ease: "expo" },
            { x: 0, ease: "expo", duration: 2 }
        );

        // gsap.fromTo(purplebg, { x: 0 }, { x: -100, duration: 1 });
    };

    useEffect(() => {
        styleBuildStuff();
        gsapAnimations();
    }, []);

    return (
        <div className="home lg:h-screen max-sm: py-40" id="home">
            <div className="w-fit h-full mx-auto relative flex flex-col lg:flex-row lg:overflow-x-visible overscroll-x-contain justify-center items-center lg:-space-x-4 max-sm:gap-5">
                <div
                    ref={(el) => {
                        ellipse1 = el;
                    }}
                    className="ellipse ellipse-1 lg:w-[20rem] lg:h-[42rem]  w-11/12 h-fit flex flex-col justify-center items-center"
                >
                    <div className="z-30 w-full h-full border-[0.8px] border-gray-400 board overflow-hidden rounded-full relative bg-black_bg text-white flex flex-col justify-center items-center hover:bg-grey_bg group">
                        <h1 className="font-Sawarabi_Mincho text-[40px] group-hover:text-[45px] transition-all duration-300 max-sm:p-5 max-md:p-5">
                            Samarth M
                        </h1>
                        <h2 className="tracking-[.40em] group-hover:tracking-[.70em] font-thin pt-6 transition-all duration-200 max-sm:pt-5 max-md:pt-5">
                            SOFTWARE
                        </h2>
                        <h2 className="tracking-[.40em] group-hover:tracking-[.70em] group-hover:pb-2 font-thin -mt-1 transition-all duration-200 max-sm:pb-5 max-md:pb-5">
                            ENGINEER
                        </h2>
                        <div className="absolute bottom-[12.5rem] text-accent rounded-full max-sm:hidden max-md:hidden">
                            <div className="relative flex">
                                <h3 className="arcText absolute">I</h3>
                                <h3 className="arcText absolute">{}</h3>
                                <h3 className="arcText absolute">l</h3>
                                <h3 className="arcText absolute">i</h3>
                                <h3 className="arcText absolute">k</h3>
                                <h3 className="arcText absolute">e</h3>
                                <h3 className="arcText absolute">{}</h3>
                                <h3 className="arcText absolute">t</h3>
                                <h3 className="arcText absolute">o</h3>
                                <h3 className="arcText absolute">{}</h3>
                                <h3 className="arcText absolute">b</h3>
                                <h3 className="arcText absolute">u</h3>
                                <h3 className="arcText absolute">i</h3>
                                <h3 className="arcText absolute">l</h3>
                                <h3 className="arcText absolute">d</h3>
                                <h3 className="arcText absolute">{}</h3>
                                <h3 className="arcText absolute">s</h3>
                                <h3 className="arcText absolute">t</h3>
                                <h3 className="arcText absolute">u</h3>
                                <h3 className="arcText absolute">f</h3>
                                <h3 className="arcText absolute">f</h3>
                            </div>
                        </div>
                    </div>
                    {/* <div className="light h-[300px] w-[400px] bg-gradient-to-t from-white to-white_trans absolute bottom-8 z-40"></div> */}
                </div>
                <div className="ellipse ellipse-2 lg:w-[20rem] lg:h-[42rem]  w-11/12 h-fit flex flex-col justify-center items-center group">
                    <div
                        ref={(el) => {
                            purplebg = el;
                        }}
                        className="purplebg z-20 w-full h-full grid place-content-end border-[0.8px] border-gray-400 overflow-hidden relative rounded-full bg-purple-pattern bg-[length:732px_753px] bg-no-repeat bg-[center_top_0rem]"
                    >
                        <div className="relative bottom-10">
                            <div className="rounded-b-full overflow-hidden transition-all duration-300">
                                <div className="bg-white aspect-square rounded-full w-11/12 mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 z-40"></div>
                                <img
                                    src={require("./stock/meeee-removebg.png")}
                                    className="z-50 pt-20 relative"
                                    alt="me"
                                />
                                <div className="bg-inherit border-[0.4rem] border-b-accent border-t-transparent border-l-transparent border-r-transparent aspect-square rounded-full w-11/12 absolute bottom-0 left-1/2 -translate-x-1/2 z-50"></div>
                                <div className="bg-inherit border-[0.4rem] border-b-accent border-t-transparent border-l-transparent border-r-transparent aspect-square rounded-full w-11/12 absolute bottom-0 left-1/2 -translate-x-1/2 z-50 rotate-[22.5deg]"></div>
                                <div className="bg-inherit border-[0.4rem] border-b-accent border-t-transparent border-l-transparent border-r-transparent aspect-square rounded-full w-11/12 absolute bottom-0 left-1/2 -translate-x-1/2 z-50 rotate-[-22.5deg]"></div>
                            </div>
                        </div>
                        {/* <div className="bg-white aspect-square w-40 rounded-full absolute bottom-10 translate-x-1/2">
							<img
								src={require("./stock/meee.png")}
								className="absolute bottom-1"
								alt="me"
							/>
						</div> */}
                    </div>
                </div>
                <div
                    ref={(el) => {
                        ellipse3 = el;
                    }}
                    className="ellipse ellipse-3 lg:w-[20rem] lg:h-[42rem]  w-11/12 h-fit flex aboutdiv relative flex-col justify-center items-center lg:overflow-x-auto overscroll-x-contain "
                    onClick={myFunction}
                    id={"about"}
                    onWheel={scrolled}
                >
                    <div className="w-full h-full flex lg:hidden absolute z-50 px-2 text-white justify-between items-center">
                        <p className="text-xl nav_left" onClick={aboutNav}>
                            O
                        </p>
                        <p className="text-xl nav_right" onClick={aboutNav}>
                            O
                        </p>
                    </div>
                    <div className="bg-black_bg h-20 w-[20.1rem] absolute lg:overflow-x-scroll overscroll-x-contain"></div>
                    <div className="z-10 w-full h-full max-sm:h-fit border-[0.8px] border-gray-400 board overflow-hidden relative rounded-full bg-black_bg text-white lg:text-right lg:px-8 lg:py-20 hover:bg-grey_bg group">
                        <h1 className="max-sm:hidden font-Sawarabi_Mincho text-[40px] group-hover:text-[45px] group-hover:-mt-1 transition-all duration-300">
                            About
                        </h1>
                        <h1 className="max-sm:hidden font-Sawarabi_Mincho text-[40px] group-hover:text-[45px] group-hover:-mt-2 transition-all duration-300">
                            Me
                        </h1>
                        <p className="max-sm:hidden about1 absolute opacity-100 top-1/2 -translate-y-about_me_translate ml-6 tracking-wider right-10 group-hover:leading-relaxed transition-all duration-300">
                            I'm a full stack software engineer based in Bangalore, India. I
                            have a great interest in web development,
                            gaming, youtube and BTS.
                        </p>
                        <p className="max-sm:hidden about2  opacity-0 absolute top-1/2 -translate-y-about_me_translate ml-6 tracking-wider right-10 group-hover:leading-relaxed transition-all duration-300">
                            I'm a Computer Science graduate and currently
                            working as a software engineer at Lion Circuits, Bangalore. I work everyday on ReactJS and
                            Django.
                        </p>
                        <p className="max-sm:hidden about3  opacity-0 absolute top-1/2 -translate-y-about_me_translate ml-6 tracking-wider right-10 group-hover:leading-relaxed transition-all duration-300">
                            I have a great interest in web development, and have
                            completed an internship in full stack dev. I keep
                            myself busy with web dev projects.
                        </p>
                        <div className="max-sm:hidden about4  opacity-0 absolute top-1/2 -translate-y-about_me_translate ml-6 tracking-wider right-10 group-hover:leading-relaxed transition-all duration-300">
                            Here are some technologies I have been working with:
                            <div className="flex justify-end items-center pt-5">
                                <ul className="text-base font-light space-y-2 pr-2">
                                    <li className="">HTML & CSS </li>
                                    <li className="">Javascript ES6+</li>
                                    <li className="">React.js</li>
                                    <li className="">Node.js</li>
                                    <li className="">Firebase</li>
                                </ul>
                                <ul className="flex flex-col justify-start items-start">
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faHtml5}
                                            className="text-orange-500 h-7"
                                        />
                                        <FontAwesomeIcon
                                            icon={faCss3Alt}
                                            className="text-blue-500 h-7 pl-1"
                                        />
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faJs}
                                            className="text-yellow-300 h-7"
                                        />
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faReact}
                                            className="text-sky-400 h-7"
                                        />
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faNodeJs}
                                            className="text-lime-500 h-7"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src={
                                                require("./stock/icons8-firebase-480.svg")
                                                    .default
                                            }
                                            alt="firebase_logo"
                                            className="h-7"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="max-sm:hidden scroll-indicator w-[4.5rem] h-8 absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center opacity-0 group-hover:opacity-50 transition duration-300 px-3 border rounded-full">
                            <div className="scroll-dot h-2 aspect-square rounded-full bg-white"></div>
                        </div>
                        <div className="max-sm:hidden -z-10 absolute bottom-10 w-full flex justify-center left-1/2 -translate-x-1/2 group-hover:bg-transparent">
                            <div className="circle relative w-11/12 aspect-square bg-transparent rounded-full overflow-hidden group-hover:bg-transparent">
                                <div className="segment absolute w-full h-full top-2/3 bg-transparent group-hover:bg-transparent">
                                    <div
                                        className="h-full bg-accent"
                                        id="progress"
                                        style={{
                                            width: Math.trunc(scale) / 2 + "%",
                                        }}
                                    ></div>
                                </div>
                                <div className="innercircle w-[18em] aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black_bg group-hover:bg-grey_bg rounded-full"></div>
                            </div>
                        </div>
                        <div className="lg:hidden overflow-y-scroll w-full h-full flex flex-col p-6 text-white">
                            <div className="text-center relative">
                                <h1 className="hidden font-Sawarabi_Mincho text-3xl">
                                    About Me
                                </h1>
                                <p className="">
                                    I'm a software engineer based in Bangalore,
                                    India. I have a great interest in full stack
                                    development, gaming, youtube and BTS.
                                </p>
                                <p className="hidden">
                                    I'm a Computer Science graduate and
                                    currently working as a software engineer at
                                    Toshiba Software Pvt. Ltd, Bangalore. I work
                                    everyday on Python and C++.
                                </p>
                                <p className="hidden">
                                    I have a great interest in web development,
                                    and have completed an internship in full
                                    stack dev. I keep myself busy with web dev
                                    projects.
                                </p>
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                    {/* <div class="trapezoid absolute bottom-8 z-50"></div> */}
                </div>
            </div>
            <div className="triangle"></div>
            <p>Currently, I'm learning NodeJs</p>
        </div>
    );
}

export default Home;
