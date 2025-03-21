import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const CharacterCard = ({ data }) => {
    const {actions} = useContext(Context)
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/character-detail/${data.uid}`)
    };

    const imageURL = actions.getCharactersImage(data.uid);

    return (
        <div className="col">
            <div className="card text-bg-dark h-100">
                <img src={imageURL} className="card-img-top" alt="imagen no disponible" />
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