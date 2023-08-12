
import { useDispatch } from 'react-redux';
import { clearUser } from '../actions';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const BASE_URL = 'http://localhost:3000';

const SignOutButton = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await axios.post(`${BASE_URL}/user/signout`); 
            dispatch(clearUser()); 
            window.location.href = '/';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Button variant="link" onClick={handleSignOut}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;

