import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const PlanetDetailPage = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.getPlanetDetails(uid);
    }, [uid]);

    const { currentPlanetDetail } = store;
    const {
        name,
        climate,
        surface_water,
        diameter,
        rotation_period,
        terrain,
        gravity,
        orbital_period,
        population
    } = currentPlanetDetail;

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: "#2f2f2f", minHeight: "50vh", padding: "3rem" }}>
            <div className="container bg secondary p-4 rounded">
                <div className="card-body">
                    <div className="row">
                        <div className="cvol-12 col-md-4 mb-4">
                            <img src="https://user-images.githubusercontent.com/5948318/38711585-ef6a8970-3e9c-11e8-96c7-fc8a610cdde2.png" alt="Imagen no disponible" className="img-fluid rounded" />
                        </div>
                        <div className="col-12 col-md-8 text-light">
                            <h1 className="mb-4 py-2">{name}</h1>
                            <ul className="list-unstyled fs-5">
                                <li><strong>Climate:</strong> {climate} </li>
                                <li><strong>Surface water:</strong> {surface_water} % </li>
                                <li><strong>Diameter:</strong> {diameter} </li>
                                <li><strong>Rotation period:</strong> {rotation_period} </li>
                                <li><strong>Terrain:</strong> {terrain} </li>
                                <li><strong>Gravity:</strong> {gravity} </li>
                                <li><strong>Orbital Period:</strong> {orbital_period} </li>
                                <li><strong>Population:</strong> {population} </li>
                            </ul>
                            <button className="btn btn-outline-light mt-4" onClick={() => navigate("/characters-page")}> Regresar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

