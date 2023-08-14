import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions';


const BASE_URL = 'http://localhost:3000';

const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post( `${BASE_URL}/user/login`, formData, {withCredentials: true});
            
            const user = response.data.user; 
            
            document.cookie = `userId=${user.id}; path=/; secure; HttpOnly; SameSite=Strict`;
            
            dispatch(setUser(response.data.user.username));

            

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // const fetchUserLikedRecipes = async () => {
    //     try {
    //         // Read the 'userId' cookie
    //         const userIdCookie = document.cookie.split('; ').find(row => row.startsWith('userId='));
    //         if (userIdCookie) {
    //             const userId = userIdCookie.split('=')[1];

    //             // Fetch the user's liked recipes using the userId
    //             const response = await axios.get(`${BASE_URL}/user/${userId}/liked-recipes`);
    //             const likedRecipes = response.data;

    //             // Dispatch an action to update the liked recipes state
    //             dispatch(updateLikedRecipes(likedRecipes));
    //         }
    //     } catch (error) {
    //         console.error('Error fetching liked recipes:', error);
    //     }
    // };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <p>
                No account? No problem! <Link to="/register">Register Here</Link>
            </p>
        </div>
    );
};

export default Login;