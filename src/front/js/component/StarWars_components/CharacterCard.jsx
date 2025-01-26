import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";

export const CharacterCard = ({data}) => {
    const {store} = useContext(Context)

    const handleDetail = () => { };

    return (
        <div className="card border-warning rounded my-3 mx-2 text-bg-dark">            
            <div className="card-body">
                <h2 className="mb-1 fw-bold">{data.name}</h2>
                {/*<span className="text-primary cursor-pointer" onClick={() => handleDetail(data)}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                </span>*/}
                <a href="#" className="btn btn-warning mt-2">More Info</a>
            </div>
        </div>
    )
}