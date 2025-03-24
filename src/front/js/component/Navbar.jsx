import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesDropdown } from "./FavoritesDropdown.jsx";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate();

	const handleLogin = () => {
		if (store.isLogged){
			actions.setIsLogged(false);
			actions.setUser({})
			navigate('/')
		}else{
			navigate('/Login')
		}
	}

	const handleLogout = () => {
		actions.setIsLogged(false)
		actions.setUser({});
		sessionStorage.removeItem("token")
		Navigate("/")
	}

	return (
		<nav className="navbar navbar-expand-lg bg-dark position-relative">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				{/* Izquierda */}
				<Link className="navbar-brand" to="/">
					<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png" alt="Star Wars Logo" style={{ height: "80px" }} />
				</Link>
				{/* Centro */}
				<div className="darth-icon-center position-absolute top-50 start-50 translate-middle">
					<img src="https://img.icons8.com/?size=512&id=35734&format=png" alt="Darth Vader" className="darth-icon" />
				</div>
				{/* Derecha */}
				<div className="collapse navbar-collapse justify-content-end" id="navbarColor02">
					<ul className="navbar-nav d-flex align-items-center gap-3">
						<li>
							<FavoritesDropdown />
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" to="/characters-page">{'Characters'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" aria-current="page" to="/planets-page">{'Planets'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" to="/starships-page">{'Starships'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-warning" to="/contactlist">{'Contacts'}</Link>
						</li>

					</ul>
					<div className="d-flex">
						{store.isLogged ? (
							<button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
						) : (
							<button className="btn btn-outline-succes" onClick={handleLogin}>Login</button>
						)}

					</div>
				</div>
			</div>

		</nav>


	);
};
