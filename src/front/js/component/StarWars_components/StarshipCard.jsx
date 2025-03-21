import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const StarshipCard = ({ data }) => {
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/starship-detail/${data.uid}`)
    }

    return (
        <div className="col">
            <div className="card text-bg-dark h-100">
                <img src="https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg" className="card-img-top" alt="imagen no disponible" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{data.name}</h5>
                    <div className="mt-auto">
                        <button className="btn btn-outline-light me-2" onClick={handleDetail}>Details</button>
                        <button className="btn btn-outline-warning"><i className="fa fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}