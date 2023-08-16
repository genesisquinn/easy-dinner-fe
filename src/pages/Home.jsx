import { Link } from 'react-router-dom';
import './Home.css';
import googleButton from '../assets/GoogleBtn.png';

const navigate = (url) => {
    window.location.href = url;
};

const auth = async () => {
    const response = await fetch('https://dinner-made-easy.onrender.com/request', { method: 'post' });
    const data = await response.json();
    console.log(data);
    navigate(data.url);
};

const Home = () => {
    return (
        <div className="home-container">
            <h2 className="welcome-heading">Dinner Made Easy</h2>
            <div className="button-container">
                <Link to="/register">
                    <button className="register-button">Register</button>
                </Link>
                <Link to="/login">
                    <button className="login-button">Log In</button>
                </Link>
                <button className="btn-auth" type="button" onClick={() => auth()}>
                    <img className="btn-auth-img" src={googleButton} alt='google sign in' />
                </button>
            </div>
        </div>
    );
};

export default Home;


