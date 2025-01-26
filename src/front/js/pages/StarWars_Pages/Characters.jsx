import React, { useContext } from "react";
import { CharacterCard } from "../../component/StarWars_components/CharacterCard.jsx";
import { Context } from "../../store/appContext.js";

export const Characters = () => {
    const {store} = useContext(Context)
          

    return(
        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">Character</h1>
            <div className="row row-cols-1 row-cols-md-3 row cols-lg-4 row-cols-xl-5">
            {store.dataCharacters.map((data, index) => (<CharacterCard key={index} data={data} />))}
              
            </div>     
        </div>
    )
}