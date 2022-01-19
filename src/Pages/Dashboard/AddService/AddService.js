import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import swal from 'sweetalert';

const AddService = () => {

    const { id } = useParams()
    const [service, setService] = useState({})
    const [image, setImage] = useState(null)
    const initial = { name: service.name, desc: service.description, price: service.price }
    console.log(initial)
    const [updated, setUpdate] = useState({})
    const [isLoading, setIsLoading] = useState(false)



    const handleBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newService = { ...updated }
        newService[field] = value
        setUpdate(newService)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('updated service', updated)

        const formData = new FormData();
        formData.append('image', image)
        setIsLoading(true)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const image = data.data.display_url
                console.log(image, 'imageeee')
                const editedData = {
                    name: updated.name,
                    price: updated.price,
                    description: updated.desc,
                    image

                }
                console.log(editedData)
                fetch(`https://obscure-waters-41987.herokuapp.com/service`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(editedData)
                })
                    .then(res => res.json())
                    .then(data => {
                        setIsLoading(false)
                        swal("Good job!", "Congratulations You added new service.", "success")
                    })
            })

    }

    return (
        <div className='container '>
            <h1 className="text-center primary-color">Insert Your Service</h1>
            <div className="row container  my-5">

                <div className="col-lg-6 mx-auto purchase">
                    <div className=" mx-auto">
                        <Card.Img variant="top" style={{
                            width: '100%', objectFit: 'cover'
                        }} src={image ? URL.createObjectURL(image) : ''} />

                        <Card.Title className="text-muted">{ }</Card.Title>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile" className="mb-3 ">
                                <Form.Control onChange={(e) => setImage(e.target.files[0])} className="w-100" type="file" placeholder='upload image' required />
                                <div className='d-flex justify-content-between'>
                                    <Form.Control className='me-2' placeholder='Service Name' onBlur={handleBlur} name="name" required />
                                    <Form.Control className='ms-2' placeholder='Service Price' onBlur={handleBlur} name="price" required />
                                </div>
                                <Form.Control as="textarea" placeholder='Service Description' onBlur={handleBlur} name="desc" required />
                            </Form.Group>
                            {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                                : <Button variant="primary" type="submit">
                                    Submit
                                </Button>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;