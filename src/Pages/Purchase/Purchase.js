import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../hooks/useAuth/useAuth';
import Footer from '../Shared/Footer/Footer';
import Navigation from './../Shared/Navigation/Navigation';
import './purchase.css';

const Purchase = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [service, setService] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onSubmit = data => {
        setIsLoading(true)
        data.service = service
        fetch('https://car-repair-server-production.up.railway.app/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                swal("Good job!", "Congratulations you are successfully proceed service!", "success")
                navigate('/dashboard')
            })
        reset()
    };




    useEffect(() => {
        fetch(`https://car-repair-server-production.up.railway.app/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])
    console.log(service);
    return (
        <div>
            <Navigation />
            <h3 className="text-center primary-color">Service Details</h3>
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



                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Label>User Name</Form.Label>
                        <i className="fa fa-user icon-3"></i>
                        <input class="form-control ps-5" defaultValue={user.displayName} {...register("userName", { required: true })} />
                        <Form.Label>Email address</Form.Label>
                        <i className="fas fa-envelope icon-1"></i>
                        <input class="form-control ps-5" type="email" defaultValue={user.email} {...register("email")} />
                        <Form.Label>City</Form.Label>
                        <i class="fas fa-city icon-4"></i>
                        <input class="form-control ps-5" placeholder="Please write your city name" {...register("city", { required: true })} />
                        <Form.Label>Present address</Form.Label>
                        <i class="fas fa-map-marker-alt icon-5"></i>
                        <input class="form-control ps-5" placeholder="Please write your address" {...register("address", { required: true })} />
                        <Form.Label>Phone Number</Form.Label>
                        <i class="fas fa-phone-alt icon-5"></i>
                        <input class="form-control ps-5" type="number" placeholder="Please write your phone number" {...register("Phone", { required: true })} />

                        {errors.exampleRequired && <span>This field is required</span>}

                        {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                            : <input className="btn btn-warning" type="submit" />}
                    </form>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Purchase;