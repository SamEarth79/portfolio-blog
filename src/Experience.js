import React from "react";

let exp1 = document.querySelector(".exp1");
let exp2 = document.querySelector(".exp2");

let displayDes1 = () => {
	let expDes1 = document.querySelector(".expDes1");
	expDes1.style = "display: block";
	let exp1Container = document.querySelector(".exp1Container");
	// exp1Container.style.height = "70%";
	// exp1Container.style.justifyContent = "space-around";
};

let displayDes2 = () => {
	let expDes2 = document.querySelector(".expDes2");
	expDes2.style = "display: block";
	let exp1Container = document.querySelector(".exp1Container");
	// exp1Container.style.height = "70%";
	// exp1Container.style.justifyContent = "space-around";
};

let displayDes0 = () => {
	let expDes1 = document.querySelector(".expDes1");
	expDes1.style = "display: hidden";
	let expDes2 = document.querySelector(".expDes2");
	expDes2.style = "display: hidden";
};

let adjustHeights1 = () => {
	console.log("adjust1");
	let exp1 = document.querySelector(".exp1");
	let exp2 = document.querySelector(".exp2");
	exp1.style = "height: 75%";
	exp2.style = "height: 25%";
	displayDes1();
};

let adjustHeights2 = () => {
	console.log("adjust2");
	let exp1 = document.querySelector(".exp1");
	let exp2 = document.querySelector(".exp2");
	exp1.style = "height: 25%";
	exp2.style = "height: 75%";
	displayDes2();
};

let adjustHeights0 = () => {
	console.log("adjust0");
	let exp1 = document.querySelector(".exp1");
	let exp2 = document.querySelector(".exp2");
	exp1.style = "height: 50%";
	exp2.style = "height: 50%";
	displayDes0();
};

function Experience() {
	return (
		<div
			className="h-screen w-full flex justify-center items-center text-white"
			id="experience"
		>
			<div className="w-10/12 h-4/6 relative" onMouseOut={adjustHeights0}>
				<div
					className="exp1 h-1/2 w-full  flex group transition-all duration-300"
					onMouseOver={adjustHeights1}
				>
					<div className="w-1/2 h-full bg-gray-700 group-hover:w-full transition-all duration-300 py-4 px-2 flex flex-col justify-between">
						<div className="">
							<div className="flex flex-col gap-2">
								<h1 className="font-Sawarabi_Mincho text-4xl">
									My Smart Shala
								</h1>
								<p className="font-light">
									Full stack web development intern
								</p>
							</div>
							<p className="mt-4">Aug 2021 - Nov 2021</p>
						</div>
						<div className="exp1Container flex flex-col h-3/4 justify-around">
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
					<div className="w-1/2 h-full group-hover:w-0 transition-all duration-300"></div>
				</div>
				<div
					className="exp2 h-1/2 w-full  flex group transition-all duration-300"
					onMouseOver={adjustHeights2}
				>
					<div className="w-1/2 h-full group-hover:w-0 transition-all duration-300"></div>
					<div className="w-1/2 h-full bg-gray-700 group-hover:w-full transition-all duration-300 py-4 px-2 flex flex-col justify-between">
						<div className="">
							<div className="flex flex-col gap-2">
								<h1 className="font-Sawarabi_Mincho text-4xl">
									My Smart Shala
								</h1>
								<p className="font-light">
									Full stack web development intern
								</p>
							</div>
							<p className="mt-4">Aug 2021 - Nov 2021</p>
						</div>
						<div className="exp2Container flex flex-col h-3/4 justify-around">
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
	);
}

export default Experience;
