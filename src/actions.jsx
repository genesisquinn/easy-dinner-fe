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
        
        resetLikedStatusForAllRecipes: (state) => {
            return state.map(recipe => ({
                ...recipe,
                liked: false,
            }));
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
        likedRecipesCount: 0,

    },
    reducers: {
        setUser: (state, action) => {
            const { username } = action.payload;
            state.username = username;
    
        },
        clearUser: (state) => {
            state.username = '';
        },

        setUserLikedRecipes: (state, action) => {
            state.likedRecipes = action.payload;
        },
        
        updateLikedRecipesCount: (state, action) => {
            state.likedRecipesCount = action.payload;
        },
    },
});

export const { setUser, clearUser, setUserLikedRecipes} = userSlice.actions;
export const { updateRecipeDetails } = recipeDetailsSlice.actions;
export const { likeRecipe, setRecipes } = recipesSlice.actions;




export const resetLikedRecipesAsync = () => async (dispatch) => {
    try {
        await axios.post(`${BASE_URL}/recipes/reset`);
        dispatch(resetLikedStatusForAllRecipes());
    } catch (error) {
        console.error('Error resetting liked recipes:', error);
    }
};


export const resetLikedStatusForAllRecipes = () => ({
    type: 'recipes/resetLikedStatusForAllRecipes',
});




export const fetchRecipes = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes`);
        dispatch(setRecipes(response.data.recipes));
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


export const updateRecipeLikedStatus = (recipeId, liked) => {
    console.log('Updating recipe liked status:', recipeId, liked);
    return {
        type: 'recipes/updateRecipeLikedStatus',
        payload: { recipeId, liked },
    };
};

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
    recipeDetails: recipeDetailsSlice.reducer,
    user: userSlice.reducer,
});

export default rootReducer;






