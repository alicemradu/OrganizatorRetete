import React, { useState } from "react";
import { useRouter } from "next/router";
import { createRecord } from "@/utils/recordsFunctions";

const AddRecipe = () => {
    const [formData, setFormData] = useState({
        nume: "",
        ingrediente: [],
        instructiuni: [],
        timp_preparare: "",
        portii: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeIngredient = (e, index) => {
        const { value } = e.target;
        const updatedIngredients = [...formData.ingrediente];
        updatedIngredients[index] = value;
        setFormData({
            ...formData,
            ingrediente: updatedIngredients
        });
    };

    const handleChangeInstruction = (e, index) => {
        const { value } = e.target;
        const updatedInstructions = [...formData.instructiuni];
        updatedInstructions[index] = value;
        setFormData({
            ...formData,
            instructiuni: updatedInstructions
        });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingrediente: [...formData.ingrediente, ""]
        });
    };

    const addInstruction = () => {
        setFormData({
            ...formData,
            instructiuni: [...formData.instructiuni, ""]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createRecord(formData); // Asigură-te că funcția createRecord din utilitarele tale corespunde pentru crearea rețetelor
            if (response) {
                router.push("/mylist");
            } else {
                alert("Failed to create record");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to create record");
        }
    };

    return (
        <div className="add-recipe-container">
            <div className="add-recipe-form">
                <h2 style={{ textAlign: "center" }}>Adaugă rețetă nouă</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="nume">Nume rețetă:</label>
                                <input
                                    type="text"
                                    id="nume"
                                    name="nume"
                                    value={formData.nume}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Ingrediente:</label>
                                {formData.ingrediente.map((ingredient, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleChangeIngredient(e, index)}
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={addIngredient}>Adaugă ingredient</button>
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-group">
                                <label>Instrucțiuni:</label>
                                {formData.instructiuni.map((instruction, index) => (
                                    <div key={index}>
                                        <textarea
                                            value={instruction}
                                            onChange={(e) => handleChangeInstruction(e, index)}
                                            className="large-textarea"
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={addInstruction}>Adaugă instrucțiune</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timp_preparare">Timp de preparare (minute):</label>
                                <input
                                    type="number"
                                    id="timp_preparare"
                                    name="timp_preparare"
                                    value={formData.timp_preparare}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="portii">Număr de porții:</label>
                                <input
                                    type="number"
                                    id="portii"
                                    name="portii"
                                    value={formData.portii}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ margin: "20px auto", display: "block" }}>Adaugă rețetă</button>
                </form>
            </div>
        </div>
    );
}

export default AddRecipe;
