import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [firstname, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleFirstName = (event) => setFirstName(event.target.value)
    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)
    const handleSubmit = async (event) => {
        event.preventDefault();
        actions.setAlert({ text: '', background: 'primary', visible: false });
        const dataToSend = { email, password, firstname }
        const success = await actions.signup(dataToSend)
        if (success) {
            navigate('/')
        }
    };
    const handleReset = () => {
        setFirstName('');
        setEmail('');
        setPassword('')
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card p-4 shadow-sm rounded login-card">
                <h2 className="mb-3 text-center text-warning">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={firstname} onChange={handleFirstName} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={handleEmail} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={handlePassword} required />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-warning">Registrarse</button>
                        <button type="reset" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}