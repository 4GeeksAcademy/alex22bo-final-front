import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";

export const CharacterCard = ({ data }) => {
    const { store } = useContext(Context)

    const handleDetail = () => { };

    return (
        <div className="col">
            <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                <img src="https://starwars-visualguide.com/assets/img/characters/1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h2 className="mb-1 fw-bold">{data.name}</h2>
                </div>
            </div>


        </div>
    )
}