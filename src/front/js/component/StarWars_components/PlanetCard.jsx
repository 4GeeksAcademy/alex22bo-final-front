import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";


export const PlanetCard = ({ data }) => {
    const { actions } = useContext(Context)
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/planet-detail/${data.uid}`)
    }

    const handleAddFavorite = () => {
        actions.addFavorite({ ...data, type: "planet" });
    };

    return (
        <div className="col">
            <div className="card text-bg-dark h-100">
                <div className="card-image-container">
                    <img src="https://user-images.githubusercontent.com/5948318/38711585-ef6a8970-3e9c-11e8-96c7-fc8a610cdde2.png" className="card-img-top" alt="imagen no disponible" />
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{data.name}</h5>
                    <div className="mt-auto">
                        <button className="btn btn-outline-light me-2" onClick={handleDetail}>Details</button>
                        <button className="btn btn-outline-warning" onClick={handleAddFavorite}><i className="fa fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}