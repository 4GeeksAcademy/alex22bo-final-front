import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Private } from "../component/Private.jsx";

export const Home = () => {


	return (
		<div className="container-fluid d-flex justify-content-center align-items-center"  style={{ minHeight: "80vh" }}>
			<div className="container">
				<img src="https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg"
					className="img-fluid" alt="blog Star Wars" style={{ maxWidth: "100%", height: "auto" }}/>
			</div>
		</div>
	);
};
