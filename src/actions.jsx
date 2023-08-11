import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { combineReducers } from 'redux';

const BASE_URL = 'http://localhost:3000';


export const likeRecipeAsync = (recipeId) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/recipes/${recipeId}/like`);
        dispatch(likeRecipe(response.data));
    } catch (error) {
        console.error('Error liking recipe:', error);
    }
};


const recipesSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {
        likeRecipe: (state, action) => {
            const recipeId = action.payload;
            const recipe = state.find(recipe => recipe._id === recipeId);
            if (recipe) {
                recipe.liked = true;
            }
        },
        
    },
});


const groceryListSlice = createSlice({
    name: 'groceryList',
    initialState: [],
    reducers: {
        addItemToGroceryList: (state, action) => {
            state.push(action.payload);
        },
        removeItemFromGroceryList: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        crossOutGroceryListItem: (state, action) => {
            const itemId = action.payload;
            const item = state.find(item => item.id === itemId);
            if (item) {
                item.crossed = true;
            }
        },
        uncrossGroceryListItem: (state, action) => {
            const itemId = action.payload;
            const item = state.find(item => item.id === itemId);
            if (item) {
                item.crossed = false;
            }
        },

    },
});


const recipeDetailsSlice = createSlice({
    name: 'recipeDetails',
    initialState: null,
    reducers: {
        updateRecipeDetails: (state, action) => {
            return action.payload;
        },
    },
});


export const { updateRecipeDetails } = recipeDetailsSlice.actions;
export const {
    likeRecipe,

} = recipesSlice.actions;
export const {
    addItemToGroceryList,
    removeItemFromGroceryList,
    crossOutGroceryListItem,
    uncrossGroceryListItem,

} = groceryListSlice.actions;


export const fetchRecipes = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes`);
        dispatch(setRecipes(response.data));
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};


const setRecipes = (recipes) => ({
    type: 'recipes/setRecipes', 
    payload: recipes,
});


const rootReducer = combineReducers({
    recipes: recipesSlice.reducer,
    groceryList: groceryListSlice.reducer,
    recipeDetails: recipeDetailsSlice.reducer,
});

export default rootReducer;
