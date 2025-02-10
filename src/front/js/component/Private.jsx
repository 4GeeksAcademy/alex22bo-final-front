import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() =>{
        if (!store.isLogged){
            navigate('/login')
        }
    }, [store.isLogged, navigate])

    return store.isLogged ? (
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUTxUQay2IG3GHmq2uppGon9DkJvU0rfopiQ&s" alt="welcome" />
        </div>
    ) : null
};