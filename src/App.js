import React from "react";
import NavigationBar from "./NavigationBar";
import Hero from "./Hero";

function App() {
	return (
		<div className="font-Montserrat bg-black_bg flex flex-col gap-20">
			<NavigationBar></NavigationBar>
			<Hero></Hero>
		</div>
	);
}

export default App;
