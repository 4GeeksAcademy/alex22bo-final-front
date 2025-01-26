import React from "react";

export const StarshipCard = () => {

    const handleDetail = () => {
        
    }

    return (
        <div className="card border-warning rounded my-3 mx-2 text-bg-dark">
            <img src={`https://starwars-visualguide.com/assets/img/characters/1.jpg`} className="card-img-top" alt="Character" />
            <div className="card-body">
                <h2 className="mb-1 fw-bold">{data.name}</h2>
                <span className="text-primary cursor-pointer" onClick={() => handleDetail(data)}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                </span>
                <a href="#" className="btn btn-warning mt-2">More Info</a>
            </div>
        </div>
    )
}