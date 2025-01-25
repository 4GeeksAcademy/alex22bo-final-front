import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Updatecontact = () => {
    const {store, actions} = useContext(Context);
    const editContact = store.currentContact;
    const [editName, setEditName] = useState(editContact.name);
    const [editPhone, setEditPhone]= useState(editContact.phone);
    const [editEmail, setEditEmail] = useState (editContact.email);
    const [editAddress, setEditAddress] = useState(editContact.address);
    const Navigate = useNavigate();
       

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const dataToSend = {
            name: editName,
            phone: editPhone,
            email: editEmail,
            address: editAddress
        }
        actions.editContact(dataToSend, editContact.id)
        Navigate("/contactlist")
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmitEdit}>
                <div className="mb-3">
                    <label htmlFor="contactname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="contactname" placeholder="Enter full name" value={editName} onChange={(event) => {setEditName(event.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" value={editPhone} onChange={(event) => {setEditPhone(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Email</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address" value={editEmail} onChange={(event) => {setEditEmail(event.target.value)}} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="address" className="form-control" id="address" placeholder="Enter address" value={editAddress} onChange={(event) => {setEditAddress(event.target.value)}} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <Link className="nav-link active" aria-current="page" to="/contactlist">{'or get back to contacts'}</Link>
        </div>
    )
}