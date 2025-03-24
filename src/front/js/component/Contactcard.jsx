import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPencil, faPhoneFlip, faEnvelope, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contactcard = ({ data }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEdit = (contact) => {
        console.log(contact);
        actions.setCurrentContact(contact);
        navigate("/updatecontact")
    }

    const handleDelete = async () => {
        actions.deleteContact(data.id);
    }

    return (
        <div className="container my-3">
            <div className="card p-3 shadow-sm rounded">
                <div className="d-flex align-items-center">

                    {/* Imagen */}
                    <div className="me-3">
                        <img src="https://media.istockphoto.com/id/1142192548/fr/vectoriel/profil-davatar-de-lhomme-silhouette-de-visage-m%C3%A2le-ou-ic%C3%B4ne-disolement-sur-le-fond.jpg?s=1024x1024&w=is&k=20&c=fJ6ldqi7MuxBAreLw_rVQD1ngD18uUVLHesfyyWhnD4="
                            className="mg-fluid rounded-circle shadow-sm contact-image" alt="contact" />
                    </div>

                    {/* Datos del contacto*/}
                    <div className="flex-grow-1">
                        <h2 className="mb-1 fw-bold">{data.name}</h2>
                        <p className="mb-1"><FontAwesomeIcon icon={faLocationDot} className="me-2" />{data.address}</p>
                        <p className="mb-1"><FontAwesomeIcon icon={faPhoneFlip} className="me-2" />{data.phone}</p>
                        <p className="mb-1"><FontAwesomeIcon icon={faEnvelope} className="me-2" />{data.email}</p>
                    </div>
                    {/* Iconos edición */}
                    <div className="d-flex gap-3">
                        <span className="text-primary cursor-pointer" onClick={() => handleEdit(data)}><FontAwesomeIcon icon={faPencil} /></span>
                        <span className="text-danger cursor-pointer" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}