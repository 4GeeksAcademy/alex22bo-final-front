import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const NewContact = () => {
    const [newContact, setNewcontact] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const { actions } = useContext(Context);
    const Navigate = useNavigate();

    const handleAddContact = (event) => {
        event.preventDefault();
        const dataToSend = {
            name: newContact,
            phone: newPhone,
            email: newEmail,
            address: newAddress
        }
        actions.addContact(dataToSend)
        Navigate("/contactlist")
    }

    return (
        <div className="container">
            <form onSubmit={handleAddContact}>
                <div className="mb-3">
                    <label htmlFor="contactname" className="form-label text-white">Full Name</label>
                    <input type="text" className="form-control bg-dark text-white" id="contactname" placeholder="Enter full name" value={newContact} onChange={(event) => { setNewcontact(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-white">Phone</label>
                    <input type="tel" className="form-control bg-dark text-white" id="phone" placeholder="Enter phone number" value={newPhone} onChange={(event) => { setNewPhone(event.target.value) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label text-white">Email</label>
                    <input type="text" className="form-control bg-dark text-white" id="address" placeholder="Enter email" value={newEmail} onChange={(event) => { setNewEmail(event.target.value) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">Address</label>
                    <input type="address" className="form-control bg-dark text-white" id="address" placeholder="Enter address" value={newAddress} onChange={(event) => { setNewAddress(event.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <Link className="nav-link active" aria-current="page" to="/contactlist">{'or get back to contacts'}</Link>
        </div>
    )
}