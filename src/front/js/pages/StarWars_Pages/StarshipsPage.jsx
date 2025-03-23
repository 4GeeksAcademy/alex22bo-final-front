import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { StarshipCard } from "../../component/StarWars_components/StarshipCard.jsx";

export const StarshipsPage = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getStarShips();        
    }, []);

    const goPreious = () => {
        actions.navigateStarships(store.starshipsPrevious);
    }

    const goNext = () => {
        actions.navigateStarships(store.starshipsNext);
    }

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#3A3A3A", minHeight: "100vh" }}>
            <div className="container">
                <h1 className="text-light text-center pt-4">Starships</h1>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {store.dataStarships && store.dataStarships.length > 0 ? (
                            store.dataStarships.map((starships) => (<StarshipCard key={starships.uid} data={starships} />)))
                            : (<p className="text-light text-center">Loading starships...</p>)}                        
                    </div>
                </div>
            </div>
            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary me-2" onClick={goPreious} disabled={!store.starshipsPrevious}>Previous</button>
                <button className="btn btn-primary me-2" onClick={goNext} disabled={!store.starshipsNext}>Next</button>
            </div>
        </div>
    )
}