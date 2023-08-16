import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../actions';
import { handleRandomizeAndLike } from '../components/randomizer';
import RecipeCard from '../components/recipeCard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ResetButton from '../components/resetBtn';
import './Recipes.css';
import Navigation from '../components/navigationBar';



const RecipesPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        if (recipes) {
            let filtered = recipes;

            if (searchQuery) {
                filtered = filtered.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            if (selectedCategory) {
                filtered = filtered.filter(recipe => recipe.category === selectedCategory);
            }

            setFilteredRecipes(filtered);
        }
    }, [searchQuery, selectedCategory, recipes]);

    return (

        <div>
            <Navigation />

            <div className="recipes-page">
                <div className="search-bar-container">
                    <div className="buttons-container">
                        <Button
                            variant="success"
                            className="randomize-button"
                            onClick={() => handleRandomizeAndLike(dispatch)}
                        >
                            Randomize & Like 7 Recipes
                        </Button>
                        <div className="reset-button">
                            <ResetButton userId={user._id} />
                        </div>
                    </div>
                    <div className="search-form-container">
                        <Form className="search-bar">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Form.Group controlId="categoryFilter">
                                <Form.Label>Filter by Category:</Form.Label>
                                <Form.Select onChange={handleCategoryChange}>
                                    <option value="">All Categories</option>
                                    <option value="Asian">Asian</option>
                                    <option value="American">American</option>
                                    <option value="Caribbean">Caribbean</option>
                                    <option value="Meditterranean">Meditterranean</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Salads">Salads</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="recipe-cards">
                    {filteredRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



export default RecipesPage;
