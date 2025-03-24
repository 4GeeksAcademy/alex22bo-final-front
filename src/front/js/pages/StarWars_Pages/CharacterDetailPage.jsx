import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const CharacterDetailPage = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (store.dataCharacters.length === 0) {
            const storedCharacters = localStorage.getItem("dataCharacters");
            if (storedCharacters) {
                setStore({ dataCharacters: JSON.parse(storedCharacters) });
            }
        }
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

    const imageURL = actions.getCharactersImage(uid);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: "#2f2f2f", minHeight: "50vh", padding: "3rem" }}>
            <div className="container bg secondary p-4 rounded">
                <div className="card-body">
                    <div className="row">
                        <div className="cvol-12 col-md-4 mb-4">
                        <img src={imageURL} alt="Imagen no disponible" className="img-fluid rounded" />
                        </div>
                        <div className="col-12 col-md-8 text-light">
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
                            <button className="btn btn-outline-light mt-4" onClick={() => navigate("/characters-page")}> Regresar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}