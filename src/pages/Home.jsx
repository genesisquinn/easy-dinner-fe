
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to Easy Dinner App</h2>
            <p>Choose an option:</p>
            <div>
                <Link to="/register">
                    <button className="btn btn-primary">Register</button>
                </Link>
            </div>
            <div>
                <Link to="/login">
                    <button className="btn btn-primary">Log In</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

