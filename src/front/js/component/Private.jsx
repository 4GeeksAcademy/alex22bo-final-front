import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (!token || !store.isLogged) {
            navigate('/login')
        }
    }, [store.isLogged])

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div>
                
            </div>
            <img src="https://collinsrace1.wordpress.com/wp-content/uploads/2023/05/sith-darth.png" alt="welcome" />
        </div>
    )
};