import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import swal from 'sweetalert';

const UpdateService = () => {

    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [updated, setUpdate] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingAfterClick, setIsLoadingAfterClick] = useState(false)


    useEffect(() => {
        fetch(`https://car-repair-server-production.up.railway.app/service/${id}`)
            .then(res => res.json())
            .then(data => {
                const newService = { ...data }
                setUpdate(newService)
                setIsLoading(false)
            })
    }, [id])

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
        setIsLoadingAfterClick(true)
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
                    description: updated.description,
                    image

                }
                fetch(`https://car-repair-server-production.up.railway.app/service?id=${updated._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(editedData)
                })
                    .then(res => res.json())
                    .then(data => {
                        setIsLoadingAfterClick(false)
                        swal("Good job!", "Congratulations Updated your service.", "success")
                    })
            })

    }

    return (
        <div className='container '>
            <h1 className="text-center primary-color">Edit Your Service</h1>
            {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                : <div className="row container  my-5">

                    <div className="col-lg-6 mx-auto purchase">
                        <div className=" mx-auto">
                            <Card.Img variant="top" style={{
                                width: '100%', objectFit: 'cover'
                            }} src={image ? URL.createObjectURL(image) : updated.image} />

                            <Card.Title className="text-muted">{ }</Card.Title>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <Form.Group controlId="formFile" className="mb-3 ">
                                    <Form.Control onChange={(e) => setImage(e.target.files[0])} className="w-100" type="file" placeholder='upload image' required />
                                    <div className='d-flex justify-content-between'>
                                        <Form.Control className='me-2' placeholder='Service Name' onBlur={handleBlur} name="name" defaultValue={updated.name} required />
                                        <Form.Control className='ms-2' placeholder='Service Price' onBlur={handleBlur} name="price" defaultValue={updated.price} required />
                                    </div>
                                    <Form.Control as="textarea" placeholder='Service Description' onBlur={handleBlur} name="description" defaultValue={updated.description} required />
                                </Form.Group>
                                {isLoadingAfterClick ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                                    : <Button variant="primary" type="submit">
                                        Submit
                                    </Button>}
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default UpdateService;