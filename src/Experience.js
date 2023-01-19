import React from "react";

const isMobile = window.matchMedia("(max-width: 800px)");

let displayDes1 = () => {
	let expDes1 = document.querySelector(".expDes1");
	expDes1.style = "display: block";
};

let displayDes2 = () => {
	let expDes2 = document.querySelector(".expDes2");
	expDes2.style = "display: block";
};

let displayDes0 = () => {
	let expDes1 = document.querySelector(".expDes1");
	expDes1.style = "display: hidden";
	let expDes2 = document.querySelector(".expDes2");
	expDes2.style = "display: hidden";
};

let adjustHeights1 = () => {
	if (!isMobile.matches) {
		console.log("adjust1");
		let exp1 = document.querySelector(".exp1");
		let exp2 = document.querySelector(".exp2");
		exp1.style = "height: 75%";
		exp2.style = "height: 25%";
		displayDes1();
	}
};

let adjustHeights2 = () => {
	if (!isMobile.matches) {
		console.log("adjust2");
		let exp1 = document.querySelector(".exp1");
		let exp2 = document.querySelector(".exp2");
		exp1.style = "height: 25%";
		exp2.style = "height: 75%";
		displayDes2();
	}
};

let adjustHeights0 = () => {
	if (!isMobile.matches) {
		console.log("adjust0");
		let exp1 = document.querySelector(".exp1");
		let exp2 = document.querySelector(".exp2");
		exp1.style = "height: 50%";
		exp2.style = "height: 50%";
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
			className="lg:h-screen min-h-fit w-full flex justify-center items-center text-white"
			id="experience"
		>
			<div
				className="w-10/12 lg:h-4/6 relative flex flex-col max-sm:gap-10"
				onMouseOut={adjustHeights0}
			>
				<div
					className="exp1 lg:h-1/2 w-full flex group transition-all duration-300"
					onMouseOver={adjustHeights1}
				>
					<div className="w-1/2 max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all duration-300 py-4 px-2 flex flex-col justify-start lg:justify-between">
						<div className="">
							<div
								className="absolute right-0 bottom-0 px-6 py-2 lg:hidden"
								onClick={toggleExperience1}
							>
								<p className="expand1">V</p>
								<p className="diminish1 hidden">A</p>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="font-Sawarabi_Mincho text-4xl max-sm:text-2xl">
									My Smart Shala
								</h1>
								<p className="font-light">
									Full stack web development intern
								</p>
							</div>
							<p className="mt-4">Aug 2021 - Nov 2021</p>
							<div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
								<div className="flex">
									<p className="font-semibold">TECH STACK</p>
								</div>
								<div className="expDes1 hidden">
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all duration-300"></div>
				</div>
				<div
					className="exp2 h-1/2 w-full  flex group transition-all duration-300"
					onMouseOver={adjustHeights2}
				>
					<div className="max-sm:hidden w-1/2 h-full group-hover:w-0 transition-all duration-300"></div>
					<div className="w-1/2 max-sm:w-full h-full min-h-fit relative bg-grey_bg border rounded-xl group-hover:w-full transition-all duration-300 py-4 px-2 flex flex-col justify-start lg:justify-between">
						<div className="">
							<div
								className="absolute right-0 bottom-0 px-6 py-2 lg:hidden"
								onClick={toggleExperience2}
							>
								<p className="expand2">V</p>
								<p className="diminish2 hidden">A</p>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="font-Sawarabi_Mincho text-4xl max-sm:text-2xl">
									My Smart Shala
								</h1>
								<p className="font-light">
									Full stack web development intern
								</p>
							</div>
							<p className="mt-4">Aug 2021 - Nov 2021</p>
							<div className="exp1Container flex flex-col lg:h-3/4 lg:justify-around">
								<div className="flex">
									<p className="font-semibold">TECH STACK</p>
								</div>
								<div className="expDes2 hidden">
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
									<p>
										Lorem ipsum dolor sit, amet consectetur
										adipisicing elit. Laudantium dicta, nisi
										repellendus nobis dolore repellat.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Experience;
