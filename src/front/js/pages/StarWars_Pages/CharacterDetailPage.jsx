import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";

export const CharacterDetailPage = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();

    useEffect(() => {
        actions.getCharacterDetails(uid);
    }, [uid]);

    const { currentCharacterDetail } = store;
    const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender
    } = currentCharacterDetail;


    return(
        <div className="container-fluid detail-containe">
            <div className="container">
                <div className="detail-row">
                    <div className="detail-img-containe">
                        <img src="https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg" alt="Imagen no disponible" />
                    </div>
                    <div className="detail-info-container">
                        <h1 className="mb-4 py-2">{name}</h1>
                        <ul className="list-unstyled fs-5">
                            <li><strong>Height:</strong> {height} </li>
                            <li><strong>Mass:</strong> {mass} </li>
                            <li><strong>Hair Color:</strong> {hair_color} </li>
                            <li><strong>Skin Color:</strong> {skin_color} </li>
                            <li><strong>Eye Color:</strong> {eye_color} </li>
                            <li><strong>Birth Year:</strong> {birth_year} </li>
                            <li><strong>Gender:</strong> {gender} </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}