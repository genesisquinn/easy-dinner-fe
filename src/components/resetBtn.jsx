import { useDispatch } from 'react-redux';
import { resetLikedRecipesAsync, resetLikedRecipesForUserAsync } from '../actions';
import { fetchGroceryList } from '../actions';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const ResetButton = ({ userId }) => {
    const dispatch = useDispatch();

    const handleResetLikedRecipes = async () => {
        console.log('Reset button clicked');
        await dispatch(resetLikedRecipesAsync());
        await dispatch(resetLikedRecipesForUserAsync(userId));
        await fetchGroceryList();
    };

    return (
        <Button variant="danger" onClick={handleResetLikedRecipes}>
            Reset Likes
        </Button>
    );
};

ResetButton.propTypes = {
    userId: PropTypes.string.isRequired, // Adjust the prop type accordingly
};

export default ResetButton;
