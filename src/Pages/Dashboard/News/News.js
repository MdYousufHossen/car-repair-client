import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';


const News = () => {
    const [image, setImage] = useState(null)
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
                const date = new Date()
                const editedData = {
                    title: updated.name,
                    description: updated.desc,
                    time: date,
                    image
                }
                console.log(editedData)
                fetch(`https://car-repair-server-production.up.railway.app/news`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(editedData)
                })
                    .then(res => res.json())
                    .then(data => {
                        setIsLoading(false)
                        swal("Good job!", "Congratulations You added new News.", "success")
                    })
            })

    }
    return (
        <div>

            <div className='container '>
                <h1 className="text-center primary-color">Insert Your News</h1>
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

                                    <Form.Control className='w-100' placeholder='Head line' onBlur={handleBlur} name="name" required />


                                    <Form.Control as="textarea" placeholder='News' onBlur={handleBlur} name="desc" required />
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
        </div>
    );
};

export default News;