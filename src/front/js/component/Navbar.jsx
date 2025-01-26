import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const Navigate = useNavigate()

	// Usar el handleEdit del componente editar del contactlist para el momento en que se va a llamar el acceso a cada pestaña
	const handleEdit = (contact) => {
		console.log(contact);
		actions.setCurrentContact(contact);
		navigate("")
	}

	return (
		<nav className="navbar navbar-expand-lg bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand text-warning" to="/">STAR WARS</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarColor02">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link className="nav-link text-warning" to="/characters">{'Characters'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" aria-current="page" to="/planets">{'Planets'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" to="/starships">{'Starships'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" to="/contactlist">{'Contacts'}</Link>
						</li>
						
					</ul>
				</div>
			</div>
		</nav>


	);
};
