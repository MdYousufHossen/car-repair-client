import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import useAuth from './../../../hooks/useAuth/useAuth';




const EditProfile = () => {
    const { user } = useAuth()
    const [image, setImage] = useState(null)
    const [users, setUsers] = useState({})




    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('image', image)

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const image = data.data.display_url
                console.log(image, 'imageeee')
                fetch(`https://obscure-waters-41987.herokuapp.com/user?email=${user.email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ image })
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
            })


    }

    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/userByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    return (
        <div>
            <h3 className="text-center primary-color">Edit Your Profile</h3>
            <hr />

            <div className="w-50 mx-auto">
                <Card.Img variant="top" style={{
                    width: '300px', height: '250px', objectFit: 'cover'
                }} src={image ? URL.createObjectURL(image) : users.image} />
                {/* <Card.Img variant="top" style={{
                    width: '300px', height: '250px', objectFit: 'cover'
                }} src={users.image ? `data:image/jpeg;base64,${users?.image} ` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&usqp=CAU"} /> */}
                <Card.Title className="text-muted">{users?.name}</Card.Title>
                <br />
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3 ">
                        <Form.Label>Image update</Form.Label>
                        <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;