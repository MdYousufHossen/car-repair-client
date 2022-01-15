import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import { NavLink, Link } from 'react-router-dom';



const ManageServices = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('https://obscure-waters-41987.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className="container">
            <h1 className="text-center primary-color">Mange Your Services</h1>
            <Row container-fluid xs={1} md={2} lg={3} className="g-5 my-5 ">
                {services.map((service, index) => (
                    <Col key={index}>
                        <Zoom>
                            <Card className="service_card">
                                <Card.Img className="img-fluid" style={{ width: '100%', height: '200px' }} variant="top" src={service.image} />
                                <Card.Body>

                                    <Card.Title>{service.name}</Card.Title>
                                    <Card.Text className="text-muted">
                                        {service.description}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/manageService/${service._id}`}> <Button variant="outline-info">Edit</Button></Link>
                                        <h5>Price: 523</h5>
                                        <Button variant="outline-danger">Delete</Button>

                                    </div>

                                </Card.Body>
                            </Card>
                        </Zoom>
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default ManageServices;