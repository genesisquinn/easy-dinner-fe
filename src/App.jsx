// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Recipes from './pages/Recipes';
import Submit from './pages/newRecipe';
import BasicExample from './pages/test';
import Navigation from './components/navigationBar';
import RecipeDetails from './pages/recipeDetails';







function App() {
  return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/submit-recipe" element={<Submit />} />
          <Route path ="/test" element ={<BasicExample />} />
          <Route path="/recipes/:_id" element={<RecipeDetails />} />
        </Routes>
      </Router>
  );
}


export default App