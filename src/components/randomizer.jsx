import axios from 'axios';
import { likeRecipeAsync } from '../actions';
import { updateRecipeLikedStatus } from '../actions';

const BASE_URL = 'http://localhost:3000';

export const handleRandomizeAndLike = async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes`);
        const allRecipes = response.data.recipes;

        const selectedRecipes = [];
        const numRecipesToSelect = 7;
        const shuffledRecipes = allRecipes.sort(() => Math.random() - 0.5);

        for (let i = 0; i < numRecipesToSelect; i++) {
            selectedRecipes.push(shuffledRecipes[i]);
        }

        for (const recipe of selectedRecipes) {
            if (!recipe.liked) {
                await dispatch(likeRecipeAsync(recipe._id));
                dispatch(updateRecipeLikedStatus(recipe._id, true)); // Update Redux state
            }
        }
    } catch (error) {
        console.error('Error randomizing and liking recipes:', error);
    }
};

