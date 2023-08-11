// RecipesPage.js
import { useEffect, useState } from 'react';
import RecipeCard from '../components/recipeCard';
import axios from 'axios';
import './Recipes.css';

const BASE_URL = 'http://localhost:3000';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    console.log(recipes);

    useEffect(() => {
        axios.get(`${BASE_URL}/recipes`)
            .then(response => {
                setRecipes(response.data.recipes);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    
    

    return (
        <div className="recipes-page">
            <div className="recipe-cards">
                {recipes.map(recipe => (
                    <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;
