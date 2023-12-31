import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { updateRecipeDetails } from '../actions';
import './editRecipe.css';


const BASE_URL = 'http://localhost:3000';

const RecipeEditForm = ({ recipeId, toggleEditMode }) => {
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState(['']);
    const [infoSubmitObj, setInfoSubmitObj] = useState('');
    const [infoErrorsObj, setInfoErrorsObj] = useState('');

    useEffect(() => {
        axios.get(`${BASE_URL}/recipes/${recipeId}`, { withCredentials: true })
            .then(response => {
                const jsonData = response.data;
                setRecipe(jsonData.recipe);
                setIngredients(jsonData.recipe.ingredients);
            })
            .catch(error => {
                console.log(error);
            });
    }, [recipeId]);

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const updatedName = event.target.name.value.trim();
        const updatedInstructions = event.target.instructions.value.trim();
        const updatedIngredients = ingredients.filter(ingredient => ingredient.trim() !== ''); // Remove empty ingredients

        if (updatedName === '' || updatedInstructions === '' || updatedIngredients.length === 0) {
            setInfoSubmitObj('');
            setInfoErrorsObj([{ message: 'Please fill in all fields.' }]);
            return;
        }

        const updatedRecipe = {
            name: updatedName,
            instructions: updatedInstructions,
            ingredients: updatedIngredients,
            category: event.target.category.value,
        };

        try {
            await axios.put(`${BASE_URL}/recipes/${recipeId}`, updatedRecipe,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            dispatch(updateRecipeDetails(updatedRecipe));
            console.log(updatedRecipe);

            setInfoSubmitObj('Recipe updated successfully!');
            setInfoErrorsObj('');
            toggleEditMode();
        } catch (error) {
            setInfoSubmitObj('');
            setInfoErrorsObj([{ message: 'Oops! Something went wrong.' }]);
        }
    }


    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div className="recipe-edit-form">
            {infoSubmitObj && (
                <div className="col-8 alert alert-success" role="alert">
                    {infoSubmitObj}
                </div>
            )}
            {infoErrorsObj && (
                <div className="col-8 alert alert-danger" role="alert">
                    {infoErrorsObj[0].message}
                </div>
            )}
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text" name="name" id="name" className="form-control" required defaultValue={recipe.name} />
                </div>

                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <ul className="ingredients-list">
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    className="ingredient-input"
                                    value={ingredient}
                                    onChange={(event) => handleIngredientChange(index, event.target.value)}
                                />
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="btn btn-outline-primary" onClick={handleAddIngredient}>
                        + Ingredient
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        name="instructions"
                        id="instructions"
                        className="instructions-textarea"
                        defaultValue={recipe.instructions}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Select Category</label>
                    <select className="form-select form-control" name="category" aria-label="Category">
                        <option value={recipe.category}>{recipe.category}</option>
                        <option value="Asian">Asian</option>
                        <option value="American">American</option>
                        <option value="Italian">Italian</option>
                        <option value="Caribbean">Caribbean</option>
                        <option value="Salads">Salads</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Update Recipe</button>
            </form>
        </div>
    );

};

RecipeEditForm.propTypes = {
    recipeId: PropTypes.string.isRequired,
    toggleEditMode: PropTypes.func.isRequired
};

export default RecipeEditForm;


