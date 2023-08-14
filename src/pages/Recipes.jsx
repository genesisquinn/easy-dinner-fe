// // RecipesPage.js
// import { useEffect, useState } from 'react';
// import RecipeCard from '../components/recipeCard';
// import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import './Recipes.css';
// import {fetchRecipes} from '../actions';

// // const BASE_URL = 'http://localhost:3000';

// const RecipesPage = () => {
//     // const [recipes, setRecipes] = useState([]);

//     // useEffect(() => {
//     //     axios.get(`${BASE_URL}/recipes`, {withCredentials: true})
//     //         .then(response => {
//     //             console.log(response.data.recipes);
//     //             setRecipes(response.data.recipes);
//     //         })
//     //         .catch(error => {
//     //             console.error('Error fetching recipes:', error);
//     //         });
//     // }, []);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchRecipes()); // Dispatch the fetchRecipes action to update the recipes state
//     }, [dispatch]);

//     // ... the rest of your component code
// };
    
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredRecipes, setFilteredRecipes] = useState([]);

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     useEffect(() => {
//         const filtered = recipes.filter(recipe =>
//             recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredRecipes(filtered);
//     }, [searchQuery, recipes]);


    
//     return (
//         <div className="recipes-page">
//             <Form className="search-bar d-flex">
//                 <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     className="me-2"
//                     aria-label="Search"
//                     value={searchQuery}
//                     onChange={handleSearchChange} 
//                 />
//                 <Button variant="outline-success">Search</Button>
//             </Form>
//             <div className="recipe-cards">
//                 {filteredRecipes.map(recipe => (
//                     <RecipeCard 
//                         key={recipe._id} 
//                         recipe={recipe}/>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecipesPage;


import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { useEffect, useState } from 'react';
import RecipeCard from '../components/recipeCard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Recipes.css';
import { fetchRecipes } from '../actions'; // Import the fetchRecipes action

// const RecipesPage = () => {
//     const dispatch = useDispatch(); // Use the useDispatch hook
//     const recipes = useSelector(state => state.recipes); // Use the useSelector hook
//     console.log(recipes);

//     useEffect(() => {
//         dispatch(fetchRecipes()); // Dispatch the fetchRecipes action to update the recipes state
//     }, [dispatch]);

//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredRecipes, setFilteredRecipes] = useState([]);

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     useEffect(() => {
//         const filtered = recipes.filter(recipe =>
//             recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredRecipes(filtered);
//     }, [searchQuery, recipes]);

//     return (
//         <div className="recipes-page">
//             <Form className="search-bar d-flex">
//                 <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     className="me-2"
//                     aria-label="Search"
//                     value={searchQuery}
//                     onChange={handleSearchChange} 
//                 />
//                 <Button variant="outline-success">Search</Button>
//             </Form>
//             <div className="recipe-cards">
//                 {filteredRecipes.map(recipe => (
//                     <RecipeCard 
//                         key={recipe._id} 
//                         recipe={recipe}/>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecipesPage;

const RecipesPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);

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
