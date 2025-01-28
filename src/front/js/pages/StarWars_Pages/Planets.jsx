import React, { useContext } from "react";
import { Context } from "../../store/appContext";



export const Planets = () =>{
    const {store} = useContext (Context)

    return(
        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">Planets</h1>
            <div className="row row-cols-1 row-cols-md-3 row cols-lg-4 row-cols-xl-5">
                

            </div>     
        </div>

        
    )
}