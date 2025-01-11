import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPencil, faPhoneFlip, faEnvelope, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contactcard = ({data}) => {
    const {actions} = useContext(Context);
    const navigate = useNavigate();
  
    const handleEdit = (contact) =>{
        console.log(contact);
        actions.setCurrentContact(contact);
        navigate("/updatecontact")
    }

    const handleDelete = async () => {
        actions.deleteContact(data.id);
    }

    return (        
        <div className="container my-4">
            <div className="card md-3 shadow-sm rounded">
                <div className="row g-0 align-items-center">

                    {/* Imagen */}
                    <div className="col-md-2 text-center w-3">
                        <img src="https://media.istockphoto.com/id/1142192548/fr/vectoriel/profil-davatar-de-lhomme-silhouette-de-visage-m%C3%A2le-ou-ic%C3%B4ne-disolement-sur-le-fond.jpg?s=1024x1024&w=is&k=20&c=fJ6ldqi7MuxBAreLw_rVQD1ngD18uUVLHesfyyWhnD4=" 
                        className="img-fluid rounded-circle shadow-sm" alt="contact" />
                    </div>

                    {/* Datos del contacto*/}
                    <div className="col-md-6">
                        <div className="card-body">
                            <h2 className="card-title mb-1">{data.name}</h2>
                            <p className="card-text mb-1"><FontAwesomeIcon icon={faLocationDot} className="me-2" />{data.address}</p>
                            <p className="card-text mb-1"><FontAwesomeIcon icon={faPhoneFlip} className="me-2" />{data.phone}</p>
                            <p className="card-text mb-1"><FontAwesomeIcon icon={faEnvelope} className="me-2" />{data.email}</p>
                        </div>
                    </div>

                    {/* Iconos edición */}
                    <div className="col-md-3 d-flex justify-content-end align-items-center px-3">
                        <span className="nav-link active" onClick={() => handleEdit(data)}><FontAwesomeIcon icon={faPencil} /></span>
                        <span onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}