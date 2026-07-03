import React from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
const isMobile = window.matchMedia("(max-width: 800px)");

let loadDescription1 = () => {
    gsap.fromTo(
        ".expDes1",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, stagger: 1, delay: 1.5 }
    );
};

let loadDescription2 = () => {
    gsap.fromTo(
        ".expDes2",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, stagger: 1, delay: 1.5 }
    );
};

const displayDes = (classname) => {
    let expDes1 = document.querySelector(classname);
    expDes1.style = "display: block";
};

let displayDes2 = () => {
    let expDes2 = document.querySelector(".expDes2");
    expDes2.style = "display: block";
    // loadDescription2();
};

let displayDes0 = () => {
    let expDes1 = document.querySelector(".expDes1");
    expDes1.style = "display: hidden";
    let expDes2 = document.querySelector(".expDes2");
    expDes2.style = "display: hidden";
    let expDes3 = document.querySelector(".expDes3");
    expDes3.style = "display: hidden";
    let expDes4 = document.querySelector(".expDes4");
    expDes4.style = "display: hidden";
};

let adjustHeights1 = () => {
    if (!isMobile.matches) {
        console.log("adjust1");
        let exp1 = document.querySelector(".exp1");
        exp1.style = "height: 100%";
        displayDes(".expDes1");
    }
};

let adjustHeights2 = () => {
    if (!isMobile.matches) {
        console.log("adjust1");
        let exp1 = document.querySelector(".exp2");
        exp1.style = "height: 75%";
        displayDes(".expDes2");
    }
};

let adjustHeights3 = () => {
    if (!isMobile.matches) {
        console.log("adjust1");
        let exp1 = document.querySelector(".exp3");
        exp1.style = "height: 75%";
        displayDes(".expDes3");
    }
};

let adjustHeights4 = () => {
    if (!isMobile.matches) {
        console.log("adjust1");
        let exp1 = document.querySelector(".exp4");
        exp1.style = "height: 75%";
        displayDes(".expDes4");
    }
};



let adjustHeights0 = () => {
    if (!isMobile.matches) {
        console.log("adjust0");
        let exp1 = document.querySelector(".exp1");
        exp1.style = "height: 50%";
        let exp2 = document.querySelector(".exp2");
        exp2.style = "height: 50%";
        let exp3 = document.querySelector(".exp3");
        exp3.style = "height: 50%";
        let exp4 = document.querySelector(".exp4");
        exp4.style = "height: 50%";
        let techstack1 = document.querySelector(".techstack1");
        techstack1.style = "display: block";
        displayDes0();
    }
};

let toggleExperience1 = () => {
    let expandEle = document.querySelector(".expand1");
    let diminishEle = document.querySelector(".diminish1");
    let expDes1 = document.querySelector(".expDes1");

    expandEle.classList.toggle("hidden");
    diminishEle.classList.toggle("hidden");
    expDes1.classList.toggle("hidden");
};

let toggleExperience2 = () => {
    let expandEle = document.querySelector(".expand2");
    let diminishEle = document.querySelector(".diminish2");
    let expDes2 = document.querySelector(".expDes2");

    expandEle.classList.toggle("hidden");
    diminishEle.classList.toggle("hidden");
    expDes2.classList.toggle("hidden");
};

function Experience() {
    return (
        <div
            className="lg:h-screen min-h-fit w-full flex justify-center items-center text-white mb-[30em]"
            id="experience"
        >
            <div
                className="w-10/12 lg:h-4/6 relative flex flex-col max-sm:gap-10"
                onMouseOut={adjustHeights0}
            >
                <div
                    className="exp4 lg:h-1/2 w-full flex flex-col gap-10 group transition-all ease-out duration-500"
                    onMouseOver={adjustHeights4}
                >
                    <div className="expCard group w-full max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all ease-out duration-500 py-4 pb-10 px-2 flex flex-col justify-start lg:justify-between">
                        <div className="">
                            <div className="flex flex-col gap-2 transition-all duration-300">
                                <h1 className="font-Sawarabi_Mincho underlineText text-4xl max-sm:text-2xl relative after:absolute after:content-[''] after:w-[0em] after:h-[2px] after:bg-accent after:bottom-0 after:left-0 max-sm:group-hover:after:w-full group-hover:after:w-[8em] after:transition-all after:duration-1000">
                                    Workday (By Spectraforce)
                                </h1>
                                <p className="font-light">
                                    Technical Project Manager
                                </p>
                            </div>
                            <p className="mt-4">Present</p>
                            <div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
                                <div className="flex flex-col gap-px techstack1">
                                    <p className="font-light">TECH STACK</p>
                                    <p className="font-bold pr-10">
                                        Agile, Jira, Cross-functional coordination
                                    </p>
                                </div>
                                <div className="expDes4 hidden">
                                    <ul className="list-disc ml-4">
                                        <li className="mb-2 expDes1Item">
                                            Lead end-to-end planning, execution, and delivery of technical projects across cross-functional teams.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Coordinate with engineering, product, QA, support, and business stakeholders for smooth project execution.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Identify project risks, dependencies, and blockers; drive mitigation plans proactively.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Facilitate daily stand-ups, sprint planning, status meetings, and stakeholder reviews.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Ensure technical implementations align with business goals and customer requirements.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Monitor system integrations, product deployments, and release activities.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Drive issue resolution by coordinating with internal teams during critical incidents.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all ease-out duration-500"></div>
                </div>
                <div
                    className="exp1 lg:h-1/2 w-full flex flex-col gap-10 group transition-all ease-out duration-500"
                    onMouseOver={adjustHeights1}
                >
                    <div className="expCard group w-full max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all ease-out duration-500 py-4 pb-10 px-2 flex flex-col justify-start lg:justify-between">
                        <div className="">
                            <div className="flex flex-col gap-2 transition-all duration-300">
                                <h1 className="font-Sawarabi_Mincho underlineText text-4xl max-sm:text-2xl relative after:absolute after:content-[''] after:w-[0em] after:h-[2px] after:bg-accent after:bottom-0 after:left-0 max-sm:group-hover:after:w-full group-hover:after:w-[5em] after:transition-all after:duration-1000">
                                    Razorpay
                                </h1>
                                <p className="font-light">
                                    Technical Account Manager
                                </p>
                            </div>
                            <p className="mt-4">Nov 2025 - Present</p>
                            <div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
                                <div className="flex flex-col gap-px techstack1">
                                    <p className="font-light">TECH STACK</p>
                                    <p className="font-bold pr-10">
                                        REST APIs, Postman, Zendesk, Jira
                                    </p>
                                </div>
                                <div className="expDes1 hidden">
                                    <ul className="list-disc ml-4">
                                        <li className="mb-2 expDes1Item">
                                            Served as the primary technical point of contact for enterprise and high-value merchants, leading 10+ end-to-end integration of Razorpay payment and banking APIs.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Managed end-to-end customer onboarding and implementation workflows, ensuring smooth handover from kickoff to go-live.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Coordinated user provisioning and deprovisioning requests, supported user access and synchronization issues, validated account creation and removal, and escalated SCIM-related issues to technical teams.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Coordinated with cross-functional teams to track deliverables, timelines, and issue resolution.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Monitored project progress, scheduled meetings, and maintained comprehensive agendas and documentation to support transparent project execution.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all ease-out duration-500"></div>
                </div>
                <div
                    className="exp2 lg:h-1/2 w-full flex flex-col gap-10 group transition-all ease-out duration-500"
                    onMouseOver={adjustHeights2}
                >
                    <div className="expCard group w-full max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all ease-out duration-500 py-4 pb-10 px-2 flex flex-col justify-start lg:justify-between">
                        <div className="">
                            <div className="flex flex-col gap-2 transition-all duration-300">
                                <h1 className="font-Sawarabi_Mincho underlineText text-4xl max-sm:text-2xl relative after:absolute after:content-[''] after:w-[0em] after:h-[2px] after:bg-accent after:bottom-0 after:left-0 max-sm:group-hover:after:w-full group-hover:after:w-[6em] after:transition-all after:duration-1000">
                                    Societe Generale
                                </h1>
                                <p className="font-light">
                                    Automation Regression Tester - Internship
                                </p>
                            </div>
                            <p className="mt-4">Feb 2023 - June 2023</p>
                            <div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
                                <div className="flex flex-col gap-px techstack1">
                                    <p className="font-light">TECH STACK</p>
                                    <p className="font-bold pr-10">
                                        Java, TestNG, Selenium, Rest API
                                    </p>
                                </div>
                                <div className="expDes2 hidden">
                                    <ul className="list-disc ml-4">
                                        <li className="mb-2 expDes1Item">
                                            Built a data-driven Selenium WebDriver–TestNG automation framework with Maven integration, automating 120+ test cases and improving test efficiency by 25%.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Enabled JSON/XML test data via REST APIs using TestNG (Java Unit test scripts).
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all ease-out duration-500"></div>
                </div> 
                <div
                    className="exp3 lg:h-1/2 w-full flex flex-col gap-10 group transition-all ease-out duration-500 hidden"
                    onMouseOver={adjustHeights3}
                >
                    <div className="expCard group w-full max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all ease-out duration-500 py-4 pb-10 px-2 flex flex-col justify-start lg:justify-between">
                        <div className="">
                            <div className="flex flex-col gap-2 transition-all duration-300">
                                <h1 className="font-Sawarabi_Mincho underlineText text-4xl max-sm:text-2xl relative after:absolute after:content-[''] after:w-[0em] after:h-[2px] after:bg-accent after:bottom-0 after:left-0 max-sm:group-hover:after:w-full group-hover:after:w-[8em] after:transition-all after:duration-1000">
                                    My Smart Shala
                                </h1>
                                <p className="font-light">
                                    Full stack web development intern
                                </p>
                            </div>
                            <p className="mt-4">Aug 2021 - Nov 2021</p>
                            <div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
                                <div className="flex flex-col gap-px techstack1">
                                    <p className="font-light">TECH STACK</p>
                                    <p className="font-bold pr-10">
                                        React.js, Python, HTML/CSS, npm
                                    </p>
                                </div>
                                <div className="expDes3 hidden">
                                    <ul className="list-disc ml-4">
                                        <li className="mb-2 expDes1Item">
                                            Led a team of 5 in development of a
                                            full stack feature that enables
                                            e-signatures and maintaining the
                                            file structure.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Optimized the feature to work on a
                                            large scale and decreased latency by
                                            40% by building own microservices to
                                            facilitate collecting and placing
                                            signatures on e-documents using
                                            Python.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Improved user experience of the
                                            feature by implementing a clean UI
                                            using ReactJS frontend framework
                                            along with HTML and CSS.
                                        </li>
                                        <li className="mb-2 expDes1Item">
                                            Interpreted the existing code base
                                            and system design and built the
                                            feature following it.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all ease-out duration-500"></div>
                </div> 
                {/* <div
                    className="exp2 h-1/2 w-full  flex group transition-all ease-out duration-500"
                    onMouseOver={adjustHeights2}
                >
                    <div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all ease-out duration-500"></div>
                    <div className="expCard w-1/2 max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all ease-out duration-500 py-4 px-2 flex flex-col justify-start lg:justify-between">
                        <div className="">
                            <div
                                className="absolute right-0 bottom-0 px-6 py-2 lg:hidden"
                                onClick={toggleExperience2}
                            >
                                <p className="expand2 bg-white rounded-full">
                                    {" "}
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className="text-accent px-2"
                                    />
                                </p>
                                <p className="diminish2 hidden bg-white rounded-full">
                                    {" "}
                                    <FontAwesomeIcon
                                        icon={faAngleUp}
                                        className="text-accent px-2"
                                    />
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-Sawarabi_Mincho underlineText text-4xl max-sm:text-2xl relative after:absolute after:content-[''] after:w-[0em] after:h-[2px] after:bg-accent after:bottom-0 after:left-0 max-sm:group-hover:after:w-full group-hover:after:w-[13em] after:transition-all after:duration-1000">
                                    Toshiba Software Pvt. Ltd.
                                </h1>
                                <p className="font-light">Software Engineer</p>
                            </div>
                            <p className="mt-4">Jan 2022 - Current</p>
                            <div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
                                <div className="flex flex-col gap-px techstack2">
                                    <p className="font-light">TECH STACK</p>
                                    <p className="font-bold pr-10">
                                        Python, REST API, C++, Google test
                                        framework
                                    </p>
                                </div>
                                <div className="expDes2 hidden">
                                    <ul className="list-disc ml-4">
                                        <li className="mb-2 expDes2Item">
                                            Designed and implemented a complete
                                            python framework for the regression
                                            cycle that outperformed the previous
                                            one by reducing regression time by
                                            40% and failures by 70%. Authored
                                            the python code matching industry
                                            standards of PEP 8.
                                        </li>
                                        <li className="mb-2 expDes2Item">
                                            Reduced manual efforts of the test
                                            team by 3x by automating multiple
                                            tasks and developing CLI tools using
                                            Python and REST APIs.
                                        </li>
                                        <li className="mb-2 expDes2Item">
                                            Authored and maintained 60+ test
                                            scripts using Google test framework
                                            through multiple scrum cycles,
                                            resulting in an identification and
                                            reduction of bugs in the product.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    // </div>
                </div> */}
            </div>
        </div>
    );
}

export default Experience;
