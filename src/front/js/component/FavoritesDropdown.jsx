import React, { useContext, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Context } from "../store/appContext";

export const FavoritesDropdown = () => {
    const { store, actions } = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async (favoriteId) => {
        const success = await actions.deleteFavorite(favoriteId);
        if (!success) {
            alert("No se pudo eliminar el item favorito");
        }
    };

    const hasFavorites = store.favorites.length > 0;

    return (
        <div className="dropdown position-relative">
            <button className="btn btn-sm dropdown-toggle custom-dropdown-btn d-flex align-items-center gap-1 px-2 py-1" type="button" id="favoritesDropdown" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <span style={{ marginRight: "8px" }}>{store.favorites.length}</span>
                <FaHeart className={`heart-icon ${hasFavorites ? "text-danger" : "text-secondary"}`} />
            </button>
            <ul className={`dropdown-menu custom-dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
                style={{ position: "absolute", top: "100%", right: 0 }} aria-labelledby="favoritesDropdown">
                {store.favorites.length === 0 ? (
                    <li className="dropdown-item">No hay favoritos</li>
                ) : (
                    store.favorites.map((fav, index) => (
                        <li key={fav.uid || index} className="dropdown-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={fav.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOL_y7zYXVM4LBHeAJDifuMJVjWmjnROn12g&s"} alt={fav.name} width="40" height="40" className="me-2 rounded" />
                                <span className="me-3">{fav.name} - {fav.type}</span>
                            </div>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(fav.uid)}>
                                <FaTrash />
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
