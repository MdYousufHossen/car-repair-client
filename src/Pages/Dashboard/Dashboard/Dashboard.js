import React, { useEffect, useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth/useAuth';


const Dashboard = () => {
    const { user, isAdmin, userLogOut } = useAuth();
    const [users, setUsers] = useState({})
    useEffect(() => {
        fetch(`https://car-repair-server-production.up.railway.app/userByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&usqp=CAU"
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light shadow">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <h5 className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                                <div className="fs-5 d-none d-sm-inline">
                                    {users.image ? <Card.Img variant="top" style={{
                                        borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', marginLeft: '10px'
                                    }} src={users.image ? `${users?.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&usqp=CAU"} />
                                        : <div style={{
                                            borderRadius: '50%', width: '100px', height: '100px', backgroundColor: '#7A7978', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                        }} > <h3 style={{ position: 'absolute', top: '30px' }}>{user.displayName.split(' ').map(word => word[0]).join('').toUpperCase()}</h3></div>}

                                    <Card.Title className="fw-bold text-center mt-2">{users.name}</Card.Title>
                                    <hr style={{ color: 'black', border: '1px solid gray', width: '100%' }} />
                                </div>
                            </h5>


                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                                <li className="nav-item">
                                    <Nav.Link as={Link} to="/home" className="nav-link align-middle px-0">
                                        <i className="fas fa-house-user "></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </Nav.Link>
                                </li>
                                {isAdmin ? <li className="nav-item">
                                    <Nav.Link as={Link} to={`/dashboard`} className="nav-link align-middle px-0">
                                        <i className="fas fa-border-all"></i> <span className="ms-1 d-none d-sm-inline">Manage Orders</span>
                                    </Nav.Link>
                                </li>
                                    : <li className="nav-item">
                                        <Nav.Link as={Link} to={`/dashboard`} className="nav-link align-middle px-0">
                                            <i className="fas fa-border-all"></i> <span className="ms-1 d-none d-sm-inline">Orders</span>
                                        </Nav.Link>
                                    </li>}
                                {!isAdmin && <li className="nav-item">
                                    <Nav.Link as={Link} to={`/dashboard/review`} className="nav-link align-middle px-0">
                                        <i className="fas fa-users"></i><span className="ms-1 d-none d-sm-inline">Review</span>
                                    </Nav.Link>
                                </li>}

                                {isAdmin && <li className="nav-item">
                                    <Nav.Link as={Link} to={`/dashboard/manageService`} className="nav-link align-middle px-0">
                                        <i className="far fa-newspaper"></i><span className="ms-1 d-none d-sm-inline">Manage Services</span>
                                    </Nav.Link>
                                </li>}
                                {isAdmin && <li className="nav-item">
                                    <Nav.Link as={Link} to={`/dashboard/addservice`} className="nav-link align-middle px-0">
                                        <i className="far fa-newspaper"></i><span className="ms-1 d-none d-sm-inline">Insert Service</span>
                                    </Nav.Link>
                                </li>}
                                {isAdmin && <li className="nav-item">
                                    <Nav.Link as={Link} to={`/dashboard/news`} className="nav-link align-middle px-0">
                                        <i className="far fa-newspaper"></i><span className="ms-1 d-none d-sm-inline">News</span>
                                    </Nav.Link>
                                </li>}
                                <li className="nav-item">
                                    <Nav.Link as={Link} to={`/dashboard/edit`} className="nav-link align-middle px-0">
                                        <i className="fas fa-user-edit"></i><span className="ms-1 d-none d-sm-inline">Edit Profile</span>
                                    </Nav.Link>
                                </li>

                                <li className="nav-item">
                                    <Nav.Link onClick={userLogOut} className="nav-link align-middle px-0">
                                        <i className="fas fa-sign-out-alt"></i><span className="ms-1 d-none d-sm-inline">Log-Out</span>
                                    </Nav.Link>
                                </li>
                            </ul>


                        </div>
                    </div>
                    <div className="col py-3">
                        <Outlet></Outlet>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;