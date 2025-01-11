import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
	
	// 1. Importar store de flux
	const {store} = useContext(Context);
	const email = store.user.email
	
	return(
	<footer className="footer mt-auto py-3 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com" target="_blank">4Geeks Academy</a> for {store.cohorte}
		</p>
		<p className="text-danger">user logged: {email}</p>
	</footer>
);}
