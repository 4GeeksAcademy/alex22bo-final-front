import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	// Code JS
	// 1. Desestructuro store y/o action
	// 2. Utilizando el hook useContext de "react"
	// 3. enviandole el parametro Context definido en appContext.js
	const {store, actions} = useContext(Context)
	// 4. Utilizo cualquier clave de store o de action en mi componente.

	const Navigate = useNavigate()

	const handleLogin = () =>{
		if (store.isLogged){
			actions.setIsLogged(false);
			actions.setUser({})
			Navigate('/')
		}else{
			Navigate('/Login')
		}
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">{store.cohorte}</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="#">{'Home'}</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link active" to="/contactlist">{'Contact-List'}</Link>
						</li>
						<li className="nav-item dropdown">
							<Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Dropdown
							</Link>
							<ul className="dropdown-menu">
								<li><Link className="dropdown-item" to="#">Action</Link></li>
								<li><Link className="dropdown-item" to="#">Another action</Link></li>
								<li><hr className="dropdown-divider"/></li>
								<li><Link className="dropdown-item" to="#">Something else here</Link></li>
							</ul>
						</li>
					</ul>
					<form className="d-flex" role="search">
						{/*<Link className="btn btn-outline-success" to={store.isLogged ? '/' : '/login'}>{store.isLogged ? 'Logout' : 'Login'}</Link>*/}
						<button className="btn btn-outline-success" onClick={handleLogin}>{store.isLogged ? 'Logout' : 'Login'}</button>
					</form>
				</div>
			</div>
		</nav>
	);
};
