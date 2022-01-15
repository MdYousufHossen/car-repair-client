import React, { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router';

const UpdateService = () => {
    const { id } = useParams()
    const [service, setService] = useState({})
    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])
    return (
        <div className='container'>
            <h1 className="text-center primary-color">Edit Your Service</h1>
            <div className="row container my-5">

                <div className="col-lg-6">
                    <Col>
                        <Card style={{ width: '80%' }} className="">
                            <Card.Img className="img-fluid" variant="top" src={service.image} />
                            <Card.Body>

                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text className="text-muted">
                                    {service.description}
                                </Card.Text>
                                <div className="d-flex justify-content-between">

                                    <h5>Price: 523</h5>

                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </div>

                <div className="col-lg-6 purchase">
                </div>
            </div>
        </div>
    );
};

export default UpdateService;