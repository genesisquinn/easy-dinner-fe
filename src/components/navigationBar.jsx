import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignOutButton from './signout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Navigation = () => {
    const username = useSelector(state => state.user.username);

    return ( 
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">Dinner Made Easy</Navbar.Brand> 
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{username}</a>
                        </Navbar.Text>
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
                            <Nav.Link as={Link} to="/meals">Meals</Nav.Link>
                            <Nav.Link as={Link} to="/list">List</Nav.Link>
                            <Nav.Link as={Link} to="/submit-recipe">Submit Recipe</Nav.Link>
                            <Nav.Link><SignOutButton /></Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}



export default Navigation