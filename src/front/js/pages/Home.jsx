import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>

			<div className="text-center mt-5">
				<div className="p-5 text-center bg-body-tertiary rounded-3">
					<h1 className="text-body-emphasis">Jumbotron with icon</h1>
					<p className="col-lg-8 mx-auto fs-5 text-muted">
						This is a custom jumbotron featuring an SVG image at the top, some longer text that wraps early thanks to a responsive <code>.col-*</code> className, and a customized call to action.
					</p>
					<div className="d-inline-flex gap-2 mb-5">
						<button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button"
							onClick={() => goToUser(1)}>
							User 1
						</button>
						<button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button"
							onClick={() => goToUser(2)}>
							User 2
						</button>
					</div>
				</div>
			</div>
		</div>



	);
};
