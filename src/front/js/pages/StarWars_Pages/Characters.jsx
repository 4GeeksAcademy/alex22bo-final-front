import React, { useContext } from "react";
import { CharacterCard } from "../../component/StarWars_components/CharacterCard.jsx";
import { Context } from "../../store/appContext.js";

export const Characters = () => {
    const { store } = useContext(Context)


    return (
        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">Character</h1>
            <div className="card-body">
                <div className="row">
                    {store.dataCharacters.map((data, index) => (<CharacterCard key={index} data={data} />))}
                </div>

            </div>

        </div>
    )
}