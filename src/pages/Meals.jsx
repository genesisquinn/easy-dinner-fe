
import { useSelector } from 'react-redux';
import RecipeCard from '../components/recipeCard';
import Navigation from '../components/navigationBar';

const Meals = () => {
    const recipes = useSelector(state => state.recipes);

    const likedRecipes = recipes.filter(recipe => recipe.liked);

    return (
        <div>
            <Navigation /> 
            <div>
                <h2>Liked Recipes</h2>
                <div className="recipe-cards">
                    {likedRecipes.map(recipe => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Meals;
