import React, { useContext, useEffect } from "react";
import { CharacterCard } from "../../component/StarWars_components/CharacterCard.jsx";
import { Context } from "../../store/appContext.js";

export const CharactersPage = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getCharacter();
        return () => {
            actions.clearCharactersStorage();
        }
    }, []);


    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#3A3A3A", minHeight: "100vh" }}>
            <div className="container">
                <h1 className="text-light text-center pt-4">Character</h1>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {store.dataCharacters.map((character) => (<CharacterCard key={character.uid} data={character} />))}
                    </div>
                </div>
            </div>
        </div>
    )
}