import React, { useContext } from "react";
import { Contactcard } from "../component/Contactcard.jsx";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Contactlist = () => {
    const {store} = useContext(Context);

    return(
        <div className="card-container shadow-sm rounded">
             <div className="d-flex justify-content-end mb-3"><Link to="/newcontact" className="btn btn-success"> Add new contact</Link></div>
            {store.contacts.map((data, index) => (<Contactcard key={index} data={data} />))}
        </div>
    )

}