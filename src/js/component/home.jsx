import React from "react";
import {useState, useEffect} from "react";
import List from "./list"
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="todolist">
			<div className="contenttask">
				<h1>Info api</h1>
				<div className="card">
					<List/>
				</div>
			</div>
		</div>
	);
};

export default Home;
