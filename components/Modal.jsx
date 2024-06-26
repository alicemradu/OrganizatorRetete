import React from "react";

const Modal = ({ isOpen, onClose, recipeDetails, onDelete }) => {
    if (!isOpen) return null;

    const handleDelete = async () => {
        await onDelete(recipeDetails._id);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Detalii rețetă</h2>
                    <ul>
                        <li><strong>Nume:</strong> {recipeDetails.nume}</li>
                        <li><strong>Ingrediente:</strong>
                            <ul>
                                {recipeDetails.ingrediente.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </li>
                        <li><strong>Instrucțiuni:</strong>
                            <ul>
                                {recipeDetails.instructiuni.map((instructiune, index) => (
                                    <li key={index}>{instructiune}</li>
                                ))}
                            </ul>
                        </li>
                        <li><strong>Timp de preparare:</strong> {recipeDetails.timp_preparare}</li>
                        <li><strong>Porții:</strong> {recipeDetails.portii}</li>
                    </ul>
                    <button onClick={handleDelete} className="btn btn-danger">Șterge rețeta</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
