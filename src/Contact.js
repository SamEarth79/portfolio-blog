import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contact() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [body, setBody] = useState("");

    const myEmail = "samarthmm.work@gmail.com";

    const sendEmail = () => {
        setName = "";
        setEmail = "";
        setBody = "";
    };

    return (
        <div
            className="lg:h-screen max-sm:mt-20 flex max-sm:flex-col justify-center items-center"
            id="contact"
        >
            <div className="h-5/6 w-10/12 flex max-sm:flex-col max-sm:gap-8 justify-around items-center relative">
                <div className="form flex flex-col gap-10 lg:w-1/3">
                    <h1 className="text-white font-Sawarabi_Mincho text-4xl">
                        Like what you see? drop an email.
                    </h1>
                    <input
                        type="text"
                        name="Name"
                        id="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        placeholder={"Name"}
                        className={
                            "p-2 placeholder:font-normal focus:outline-accent placeholder:text-base rounded-sm"
                        }
                    />
                    <input
                        type="email"
                        name="Email"
                        id="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder={"Email address"}
                        className={
                            "p-2 placeholder:font-normal  valid:focus:outline-accent placeholder:text-base invalid:focus:outline-pink-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 rounded-sm"
                        }
                    />
                    <input
                        type="text"
                        name="Body"
                        id="Body"
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value);
                        }}
                        placeholder={"Your message"}
                        className={
                            "p-2 placeholder:font-normal focus:outline-accent placeholder:text-base pb-32 placeholder:absolute placeholder:top-2 rounded-sm"
                        }
                    />
                    <a
                        href={`mailto:${myEmail}?subject='An email from ${name} from portfolio website'&body='${body}'`}
                    >
                        <button
                            type="submit"
                            className="bg-accent text-white px-3 py-2 rounded-full w-4/12 relative left-1/2 -translate-x-1/2 active:bg-purple-700 hover:-translate-y-2 transition-all duration-200"
                            onClick={sendEmail}
                        >
                            Send
                        </button>
                    </a>
                </div>
                <div className="links flex flex-col p-6  gap-8">
                    <a
                        href="https://www.linkedin.com/in/samarthmm/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="flex gap-4 items-center text-white">
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className={"text-6xl max-sm:text-4xl"}
                            />
                            <p>/ samarthmm</p>
                        </div>
                    </a>
                    <a
                        href="https://github.com/SamEarth79"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="flex gap-4 items-center text-white">
                            <FontAwesomeIcon
                                icon={faGithub}
                                className={"text-6xl max-sm:text-4xl"}
                            />
                            <p>/ SamEarth79</p>
                        </div>
                    </a>
                    <a
                        href={`mailto:${myEmail}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="flex gap-4 items-center text-white">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className={"text-6xl max-sm:text-4xl"}
                            />
                            <p className="break-all">
                                / samarthmm.work@gmail.com
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
