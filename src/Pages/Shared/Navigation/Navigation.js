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
    }, [user.email])

    function getFirstLetters(str) {
        const firstLetters = str;

        return firstLetters;
    }


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
                            user.email && <Nav.Link >
                                <div>
                                    {users.image ? <Card.Img variant="top" style={{
                                        borderRadius: '50%', width: '70px', height: '70px', objectFit: 'cover', marginLeft: '10px'
                                    }} src={users.image ? `${users?.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&usqp=CAU"} />
                                        : <div style={{
                                            borderRadius: '50%', width: '70px', height: '70px', backgroundColor: '#7A7978', display: 'flex', justifyContent: 'center'
                                        }} > <h3 style={{ position: 'absolute', top: '30px' }}>{user.displayName.split(' ').map(word => word[0]).join('').toUpperCase()}</h3></div>}
                                </div>

                            </Nav.Link>
                        }
                        {!user.email && <Nav.Link as={Link} className="mt-4" to="/login">Login</Nav.Link>}
                        {!user.email && <Nav.Link > <Card.Img variant="top" style={{
                            borderRadius: '50%', width: '70px', height: '70px', objectFit: 'cover', marginLeft: '10px'
                        }} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&usqp=CAU"} /></Nav.Link>}






                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Navigation;