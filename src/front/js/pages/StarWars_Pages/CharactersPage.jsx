import React, { useContext, useEffect } from "react";
import { CharacterCard } from "../../component/StarWars_components/CharacterCard.jsx";
import { Context } from "../../store/appContext.js";

export const CharactersPage = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getCharacters();
    }, []);

    const goPreious = () => {
        actions.navigateCharacters(store.charactersPrevious);
    }

    const goNext = () => {
        actions.navigateCharacters(store.charactersNext);
    }

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#3A3A3A", minHeight: "100vh" }}>
            <div className="container">
                <h1 className="text-center text-light pt-4">Personajes</h1>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {store.dataCharacters && store.dataCharacters.length > 0 ? (
                            store.dataCharacters.map(character => (
                                <CharacterCard key={character.uid} data={character} className="col-auto"/>
                            ))
                        ) : (
                            <p className="text-light text-center">Cargando personajes...</p>
                        )}
                    </div>
                </div>
            </div>
            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary me-2" onClick={goPreious} disabled={!store.charactersPrevious}>Previous</button>
                <button className="btn btn-primary me-2" onClick={goNext} disabled={!store.charactersNext}>Next</button>
            </div>
        </div>





    )
}