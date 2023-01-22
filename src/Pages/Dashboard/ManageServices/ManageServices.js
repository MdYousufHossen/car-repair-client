import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';



const ManageServices = () => {
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://car-repair-server-production.up.railway.app/services')
            .then(res => res.json())
            .then(data => {
                setServices(data)
                setIsLoading(false)
            })
    }, [])
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    fetch(`https://car-repair-server-production.up.railway.app/service/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.deletedCount > 0) {
                                const remainingService = services.filter(service => service._id !== id)
                                setServices(remainingService)
                            }
                        })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    }

    return (
        <div className="container">
            <h1 className="text-center primary-color">Mange Your Services</h1>
            {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                : <Row container-fluid xs={1} md={2} lg={3} className="g-5 my-5 ">
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
                                            <Link to={`/manageService/${service._id}`}>  <Button variant="outline-info">Edit</Button></Link>
                                            <h5>Price: $ {service.price}</h5>
                                            <Button onClick={() => handleDelete(service._id)} variant="outline-danger">Delete</Button>

                                        </div>

                                    </Card.Body>
                                </Card>
                            </Zoom>
                        </Col>
                    ))}
                </Row>}

        </div>
    );
};

export default ManageServices;