import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { combineReducers } from 'redux';


const BASE_URL = 'http://localhost:3000';



const recipesSlice = createSlice({
    name: 'recipes',
    initialState: [],
    reducers: {
        updateRecipeLikedStatus: (state, action) => {
            const { recipeId, liked } = action.payload;
            const recipe = state.find(recipe => recipe._id === recipeId);
            if (recipe) {
                recipe.liked = liked;

            }
        },
        setRecipes: (state, action) => {
            return action.payload;
        },
    },
});


const groceryListSlice = createSlice({
    name: 'groceryList',
    initialState: {
        likedRecipeIngredients: [],
        customItems: [],
    },
    reducers: {
        addLikedRecipeIngredients: (state, action) => {
            state.likedRecipeIngredients.push(...action.payload);
        },
        removeLikedRecipeIngredients: (state, action) => {
            const ingredientsToRemove = action.payload;
            console.log('Ingredients to remove:', ingredientsToRemove);
            state.likedRecipeIngredients = state.likedRecipeIngredients.filter(
                ingredient => !ingredientsToRemove.includes(ingredient)
            );
        },
        setLikedRecipeIngredients: (state, action) => {
            state.likedRecipeIngredients = action.payload;
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
        likedRecipes: [],
    },
    reducers: {
        setUser: (state, action) => {
            const { username, likedRecipes } = action.payload;
            state.username = username;
            state.likedRecipes = likedRecipes;
        },
        clearUser: (state) => {
            state.username = '';
            state.likedRecipes = [];
        },

        setUserLikedRecipes: (state, action) => {
            state.likedRecipes = action.payload;
        },
        addLikedRecipe: (state, action) => {
            state.likedRecipes.push(action.payload);
        },
        removeLikedRecipe: (state, action) => {
            state.likedRecipes = state.likedRecipes.filter(recipeId => recipeId !== action.payload);
        },
    },
});

export const { setUser, clearUser, setUserLikedRecipes, addLikedRecipe, removeLikedRecipe } = userSlice.actions;
export const { updateRecipeDetails } = recipeDetailsSlice.actions;
export const { likeRecipe, setRecipes } = recipesSlice.actions;


export const { addLikedRecipeIngredients, removeLikedRecipeIngredients } = groceryListSlice.actions;



export const fetchRecipes = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes`);
        dispatch(setRecipes(response.data.recipes));
        console.log(response.data.recipes);
        console.log 
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};





export const loginUser = (userData) => async (dispatch) => {
    try {

        dispatch(setUser(userData));
        await dispatch(fetchUserLikedRecipes());

    } catch (error) {
        console.error('Error logging in:', error);
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(clearUser());
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export const setLikedRecipeIngredients = (ingredients) => (dispatch) => {
    dispatch(addLikedRecipeIngredients(ingredients));
};


export const removeItemFromGroceryList = (recipeId) => async (dispatch, getState) => {
    const state = getState();
    const recipe = state.recipes.find(recipe => recipe._id === recipeId);
    console.log(state.recipes);
    console.log(recipeId);
    console.log(recipe);
    if (recipe) {
        dispatch(removeLikedRecipeIngredients(recipe.ingredients));
    }
};


export const likeRecipeAsync = (recipeId) => async (dispatch) => {
    try {
        await axios.post(`${BASE_URL}/recipes/${recipeId}/like`);
        dispatch(updateRecipeLikedStatus(recipeId, true));
    } catch (error) {
        console.error('Error liking recipe:', error);
    }
};

export const unlikeRecipeAsync = (recipeId) => async (dispatch) => {
    try {
        await axios.post(`${BASE_URL}/recipes/${recipeId}/unlike`);
        dispatch(updateRecipeLikedStatus(recipeId, false));
    } catch (error) {
        console.error('Error unliking recipe:', error);
    }
};


export const updateRecipeLikedStatus = (recipeId, liked) => ({
    type: 'recipes/updateRecipeLikedStatus',
    payload: { recipeId, liked },
});

export const fetchUserLikedRecipes = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/liked-recipes`);
        dispatch(setUser(response.data));
    } catch (error) {
        console.error('Error fetching user liked recipes:', error);
    }
};



const rootReducer = combineReducers({
    recipes: recipesSlice.reducer,
    groceryList: groceryListSlice.reducer,
    recipeDetails: recipeDetailsSlice.reducer,
    user: userSlice.reducer,
});

export default rootReducer;






