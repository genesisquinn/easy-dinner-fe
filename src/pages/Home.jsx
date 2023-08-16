import { Link } from 'react-router-dom';
import './Home.css'; 

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
            </div>
        </div>
    );
};

export default Home;


