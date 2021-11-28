import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import logo from '../../Images/logo-orange-2.png'

const Navigation = () => {
    const { user, userLogOut } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="135"
                        height="35"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>

                        {

                            user.email && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>

                        }
                    </Nav>
                    <Nav>
                        {
                            user.email ? <Nav.Link >{user.displayName}</Nav.Link>
                                :
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }
                        {
                            user.email && <Nav.Link onClick={userLogOut} >Log-Out</Nav.Link>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;