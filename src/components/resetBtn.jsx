import { useDispatch } from 'react-redux';
import { resetLikedRecipesAsync } from '../actions';
import Button from 'react-bootstrap/Button';

const ResetButton = () => {
    const dispatch = useDispatch();

    const handleResetLikedRecipes = async () => {
        await dispatch(resetLikedRecipesAsync());
    };

    return (
        <Button variant="danger" onClick={handleResetLikedRecipes}>
            Reset Likes
        </Button>
    );
};

export default ResetButton;
