import React, { use, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleEmail = (event) => { setEmail(event.target.value) }
    const handlePassword = (event) => { setPassword(event.target.value) };

    const handleReset = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        actions.setAlert({ text: '', background: 'primary', visible: false })
        const dataToSend = { email, password }
        await actions.login(dataToSend)
        if (store.isLogged) {
            navigate('/private');
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card p-4 shadow-sm rounded login-card">
                <h1 className="mb-3 text-center text-warning">Login</h1>
                <form onSubmit={handleSubmit} className="text-start">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={handlePassword} required />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-warning">Ingresar</button>
                        <button type="reset" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}