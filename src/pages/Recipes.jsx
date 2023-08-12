// RecipesPage.js
import { useEffect, useState } from 'react';
import RecipeCard from '../components/recipeCard';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Recipes.css';

const BASE_URL = 'http://localhost:3000';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    // console.log(recipes);

    useEffect(() => {
        axios.get(`${BASE_URL}/recipes`, {withCredentials: true})
            .then(response => {
                setRecipes(response.data.recipes);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const filtered = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
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
            </Form>
            <div className="recipe-cards">
                {filteredRecipes.map(recipe => (
                    <RecipeCard 
                        key={recipe._id} 
                        recipe={recipe}/>
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;
