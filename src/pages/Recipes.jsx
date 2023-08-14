import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../actions';
import { handleRandomizeAndLike } from '../components/randomizer';
import RecipeCard from '../components/recipeCard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ResetButton from '../components/resetBtn';
import './recipes.css'; 



const RecipesPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const user = useSelector(state => state.user);
    console.log(user);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        if (recipes) {
            const filtered = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRecipes(filtered);
        }
    }, [searchQuery, recipes]);

    return (
        <div className="recipes-page">
            <Form className="search-bar d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Button variant="outline-success">Search</Button>
                <Button
                    variant="success"
                    className="ms-2" 
                    onClick={() => handleRandomizeAndLike(dispatch)}
                >
                    Randomize & Like 7 Recipes
                </Button>
                <ResetButton userId={user._id}/>
            </Form>
            <div className="recipe-cards">
                {filteredRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;
