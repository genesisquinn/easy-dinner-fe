import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./RecipeDetails.css";
import RecipeEditForm from './editRecipe';
import { updateRecipeDetails } from '../actions';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const RecipeDetails = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();


    const [editMode, setEditMode] = useState(false); 
    const recipe = useSelector(state => state.recipeDetails);

useEffect(() => {
    axios.get(`${BASE_URL}/recipes/${_id}`, { withCredentials: true })
        .then(response => {
            const jsonData = response.data;
            if (jsonData.success) {
                dispatch(updateRecipeDetails(jsonData.recipe)); 
            } else {
                console.log("Failed to fetch recipe details.");
            }
        })
        .catch(error => {
            console.log(error);
        });
}, [dispatch, _id]);

    if (recipe === null) {
        return <p>No item found.</p>;
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };


    return (
        <div className="container">
            {!editMode ? (
                <>
                    <div className="row">
                        <div className="col-12 img-container">
                            <img
                                src={recipe.image}
                                className="img-fluid"
                                alt={recipe.name}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-8 recipe-details">
                            <h1 className="recipe-name">{recipe.name}</h1>
                            <div className="category">
                                <i className="bi bi-tag"></i> {recipe.category}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 instructions">
                            <h4>Cooking Instructions</h4>
                            {recipe.instructions}
                        </div>

                        <div className="col-md-6 ingredients">
                            <h4>Ingredients</h4>
                            <ul className="list-group list-group-flush grocery-list">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Add an edit button to switch to edit mode */}
                    <button className="btn btn-primary" onClick={toggleEditMode}>
                        Edit Recipe
                    </button>
                </>
            ) : (
        
                <div>
                    <h2>Edit Recipe</h2>
                    <RecipeEditForm recipeId={_id} toggleEditMode={toggleEditMode} />

                    <button className="btn btn-secondary mt-3" onClick={toggleEditMode}>
                        Cancel Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;

// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import "./RecipeDetails.css";
// import { updateRecipeDetails } from '../actions';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';

// const RecipeDetails = () => {
//     const { _id } = useParams();
//     const dispatch = useDispatch();

//     const recipe = useSelector(state => state.recipeDetails);

//     useEffect(() => {
//         axios.get(`${BASE_URL}/recipes/${_id}`, { withCredentials: true })
//             .then(response => {
//                 const jsonData = response.data;
//                 if (jsonData.success) {
//                     dispatch(updateRecipeDetails(jsonData.recipe)); 
//                 } else {
//                     console.log("Failed to fetch recipe details.");
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, [dispatch, _id]);

//     if (recipe === null) {
//         return <p>No item found.</p>;
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-12 img-container">
//                     <img
//                         src={recipe.image}
//                         className="img-fluid"
//                         alt={recipe.name}
//                     />
//                 </div>
//             </div>

//             <div className="row justify-content-center">
//                 <div className="col-md-8 recipe-details">
//                     <h1 className="recipe-name">{recipe.name}</h1>
//                     <div className="category">
//                         <i className="bi bi-tag"></i> {recipe.category}
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-md-6 instructions">
//                     <h4>Cooking Instructions</h4>
//                     {recipe.instructions}
//                 </div>

//                 <div className="col-md-6 ingredients">
//                     <h4>Ingredients</h4>
//                     <ul className="list-group list-group-flush grocery-list">
//                         {recipe.ingredients.map((ingredient, index) => (
//                             <li key={index}>{ingredient}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
            
//             {/* Use Link to navigate to the edit recipe page */}
//             <Link to={`/edit-recipe/${_id}`} className="btn btn-primary">
//                 Edit Recipe
//             </Link>
//         </div>
//     );
// };

// export default RecipeDetails;