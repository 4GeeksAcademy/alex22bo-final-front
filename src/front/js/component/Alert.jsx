import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Alert = () =>{
    const { store } = useContext(Context)

    return(
        <div className={`container ${store.alert.visible ? '' : 'd-none'}`}>
            <div className={`alert alert-${store.alert.background}`} role="alert">
                {store.alert.text}
            </div>
        </div>
    )
}