import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { PlanetCard } from "../../component/StarWars_components/PlanetCard.jsx";

export const PlanetsPage = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getPlanets();
        return () => {
            actions.clearPlanetsStorage();
        }
    }, [])

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#3A3A3A", minHeight: "100vh" }}>
            <div className="container">
                <h1 className="text-light text-center pt-4">Planets</h1>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {store.dataPlanets && store.dataPlanets.length > 0 ? (
                            store.dataPlanets.map((planets) => (<PlanetCard key={planets.uid} data={planets} />)))
                            : (<p className="text-light text-center">Loading Planets...</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}