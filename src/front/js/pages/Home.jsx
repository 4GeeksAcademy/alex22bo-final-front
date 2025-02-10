import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Private } from "../component/Private.jsx";

export const Home = () => {
	const { store } = useContext(Context);
	
	return (
		<div>			
			<div className="container mt-1">
				{store.isLogged ? (					
						<Private/>							
				):(
					<img src="https://as2.ftcdn.net/v2/jpg/02/25/37/11/1000_F_225371121_9ohf0f4olaFTnlTqnZXZDJcjPnN5mism.jpg"
                            className="img-fluid" alt="underconstruction" />
				)}			
			</div>
		</div>
	);
};
