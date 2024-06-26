import { useEffect, useState } from "react";
import { deleteRecord, getRecords } from "@/utils/recordsFunctions";

// Definirea componentului Modal separat
const ViewRecipeModal = ({ isOpen, onClose, recipeDetails, onDelete }) => {
    if (!isOpen) return null;

    const handleDelete = async () => {
        await onDelete(recipeDetails._id); // Apel functie stergere reteta dupa id
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Detalii reteta</h2>
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
                    <button onClick={handleDelete} className="btn btn-danger">Șterge reteta</button>
                </div>
            </div>
        </div>
    );
}

const NavLink = ({ to, children }) => {
    return (
        <a href={to} className="mx-4 text-lg text-white hover:text-gray-300">
            {children}
        </a>
    );
}

const MyList = () => {
    const [records, setRecords] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const fetchRecords = async () => {
        try {
            const response = await getRecords();
            setRecords(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteRecord = async (id) => {
        try {
            const response = await deleteRecord(id);

            if (response.deletedCount === 1) {
                const newRecords = records.filter((record) => record._id !== id);
                setRecords(newRecords);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

   const openModal = (recipeDetails) => {
        setSelectedRecipe(recipeDetails);
    };


    const closeModal = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className="mylist-page">
            <div className="mylist-content">
                <div className="mylist-grid">
                    <h2 className="mylist-title">Lista ta de rețete</h2>
                    {records.length > 0 ? (
                        <div className="mylist-card">
                            <div className="mylist-record">
                                <div className="record-column">
                                    <h3>Nume Rețetă</h3>
                                </div>
                                <div className="record-column">
                                    <h3>Timp de preparare</h3>
                                </div>
                                <div className="record-column">
                                    <h3>Porții</h3>
                                </div>
                                <div className="record-column">
                                    <h3>Detalii</h3>
                                </div>
                            </div>
                            {records.map(record => (
                                <div key={record._id} className="mylist-record">
                                    <div className="record-column">
                                        <p>{record.nume}</p>
                                    </div>
                                    <div className="record-column">
                                        <p>{record.timp_preparare}</p>
                                    </div>
                                    <div className="record-column">
                                        <p>{record.portii}</p>
                                    </div>
                                    <div className="record-column">
                                        <button onClick={() => openModal(record)}>Vezi detalii</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Lista este goală. Adaugă o rețetă acum!</p>
                    )}
                </div>
                <NavLink to="/addrecipe">
                    <button className="btn">Adaugă rețetă</button>
                </NavLink>
                <ViewRecipeModal isOpen={selectedRecipe !== null} onClose={closeModal} recipeDetails={selectedRecipe} onDelete={handleDeleteRecord} />
            </div>
        </div>
    );
}

export default MyList;
