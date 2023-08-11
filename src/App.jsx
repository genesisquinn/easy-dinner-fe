// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Recipes from './pages/Recipes';
import Submit from './pages/newRecipe';
import BasicExample from './pages/test';







function App() {
  return (
      <Router>
        <Routes>
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/submit-recipe" element={<Submit />} />
          <Route path ="/test" element ={<BasicExample />} />
        </Routes>
      </Router>
  );
}


export default App