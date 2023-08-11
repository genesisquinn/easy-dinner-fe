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
        // ... other recipe-related reducers
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
        // ... other grocery list-related reducers
    },
});

export const {
    likeRecipe,
    // ... other recipe-related actions
} = recipesSlice.actions;

export const {
    addItemToGroceryList,
    removeItemFromGroceryList,
    crossOutGroceryListItem,
    uncrossGroceryListItem,
    // ... other grocery list-related actions
} = groceryListSlice.actions;

const rootReducer = combineReducers({
    recipes: recipesSlice.reducer,
    groceryList: groceryListSlice.reducer,
});


export default rootReducer;
