import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const StarShipDetailPage = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.getStarShipDetails(uid);
    }, [uid]);

    const { currentStarshipDetail } = store;
    const {
        name,
        model,
        cargo_capacity,
        passengers,
        max_atmosphering_speed,
        crew,
        length,
        manufacturer,
        MGLT
    } = currentStarshipDetail;

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: "#2f2f2f", minHeight: "50vh", padding: "3rem" }}>
            <div className="container bg secondary p-4 rounded">
                <div className="card-body">
                    <div className="row">
                        <div className="cvol-12 col-md-4 mb-4">
                            <img src="https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg" alt="Imagen no disponible" className="img-fluid rounded" />
                        </div>
                        <div className="col-12 col-md-8 text-light">
                            <h1 className="mb-4 py-2">{name}</h1>
                            <ul className="list-unstyled fs-5">
                                <li><strong>Model:</strong> {model} </li>
                                <li><strong>Cargo capacity:</strong> {cargo_capacity} </li>
                                <li><strong>Passengers:</strong> {passengers} </li>
                                <li><strong>Max Atmosphering Speed:</strong> {max_atmosphering_speed} </li>
                                <li><strong>Crew:</strong> {crew} </li>
                                <li><strong>Length:</strong> {length} </li>
                                <li><strong>Manufacturer:</strong> {manufacturer} </li>
                                <li><strong>MGLT:</strong> {MGLT} </li>
                            </ul>
                            <button className="btn btn-outline-light mt-4" onClick={() => navigate("/starships-page")}> Regresar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}