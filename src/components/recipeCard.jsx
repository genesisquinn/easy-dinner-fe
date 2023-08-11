import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeRecipe } from '../actions';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        dispatch(likeRecipe(recipe.id));
        setLiked(true);
    };

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
        <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>{recipe.category}</Card.Text>
            <div className="card-buttons">
                <Button variant="primary" onClick={handleLikeClick}>
                    {liked ? '❤️ Liked' : '♡ Like'}
                </Button>
            </div>
        </Card.Body>
    </Card>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default RecipeCard;

