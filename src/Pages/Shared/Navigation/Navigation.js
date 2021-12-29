import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import logo from '../../Images/logo-orange-2.png'

const Navigation = () => {
    const { user, userLogOut } = useAuth();
    const [users, setUsers] = useState({})
    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/userByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

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
                    <Nav className="ms-auto fw-bold">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>

                        {

                            user.email && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>

                        }
                        {
                            user.email && <Nav.Link onClick={userLogOut} >Log-Out</Nav.Link>
                        }

                    </Nav>
                    <Nav className="fw-bold">


                        {
                            user.email ? <Nav.Link >
                                <Card.Img variant="top" style={{
                                    borderRadius: '50%', width: '70px', height: '70px', objectFit: 'cover', marginLeft: '10px'
                                }} src={users.image ? `data:image/jpeg;base64,${users?.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&usqp=CAU"} />

                            </Nav.Link>
                                : <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;