import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { combineReducers } from 'redux';

const BASE_URL = 'http://localhost:3000';

export const updateRecipeLikedStatus = (recipeId, liked) => ({
    type: 'recipes/updateRecipeLikedStatus',
    payload: { recipeId, liked },
});



export const likeRecipeAsync = (recipeId) => async (dispatch) => {
    try {
        await axios.post(`${BASE_URL}/recipes/${recipeId}/like`);
        dispatch(likeRecipe(recipeId)); // Update liked property in Redux store
        dispatch(addItemToGroceryList(recipeId)); // Add ingredients to grocery list
    } catch (error) {
        console.error('Error liking recipe:', error);
    }
};


export const unlikeRecipeAsync = (recipeId) => async (dispatch) => {
    try {
        await axios.post(`${BASE_URL}/recipes/${recipeId}/unlike`);
        dispatch(likeRecipe(recipeId)); // Update the store with the same action as liking

        // Also update the liked property to false in your Redux store
        dispatch(updateRecipeLikedStatus(recipeId, false)); // You need to define this action
    } catch (error) {
        console.error('Error unliking recipe:', error);
    }
};



const recipesSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {
        // ...
        updateRecipeLikedStatus: (state, action) => {
            const { recipeId, liked } = action.payload;
            const recipe = state.find(recipe => recipe._id === recipeId);
            if (recipe) {
                recipe.liked = liked;
            }
        },
        // ...
    },
    // ...
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
const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload;
        },
        clearUser: (state) => {
            state.username = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;


export const { updateRecipeDetails } = recipeDetailsSlice.actions;
export const { likeRecipe } = recipesSlice.actions;

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
    user: userSlice.reducer,
});

export default rootReducer;
