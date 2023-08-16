// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Recipes from './pages/Recipes';
import Submit from './pages/newRecipe';
import RecipeDetails from './components/recipeDetails';
import List from './pages/List';
import Home from './pages/Home';
import Register from './components/registerUser';
import Login from './components/logIn';
import Meals from './pages/Meals';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/submit-recipe" element={<Submit />} />
        <Route path="/recipes/:_id" element={<RecipeDetails />} />
        <Route path="/list" element={<List />} />
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </Router>
  );
}


export default App


