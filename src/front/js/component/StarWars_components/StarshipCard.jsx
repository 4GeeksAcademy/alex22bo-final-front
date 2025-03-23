import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";


export const StarshipCard = ({ data }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/starship-detail/${data.uid}`)
    }

    const handleAddFavorite = () => {
        actions.addFavorite({ ...data, type: "starship"});
    };

    const isFavorite = store.favorites.some(fav => fav.uid === data.uid && fav.type === "starship");

    return (
        <div className="col">
            <div className="card text-bg-dark h-100">
                <img src="https://llerena.org/wp-content/uploads/2017/11/imagen-no-disponible-1.jpg" className="card-img-top" alt="imagen no disponible" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{data.name}</h5>
                    <div className="mt-auto">
                        <button className="btn btn-outline-light me-2" onClick={handleDetail}>Details</button>
                        <button className={`btn ${isFavorite ? "btn-danger" : "btn-outline-warning"}`} onClick={handleAddFavorite}>
                            <i className="fa fa-heart"></i>
                        </button>                    </div>
                </div>
            </div>
        </div>
    )
}