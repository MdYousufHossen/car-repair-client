import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import useAuth from './../../../hooks/useAuth/useAuth';
import imgbbUploader from "imgbb-uploader";



const EditProfile = () => {
    const { user } = useAuth()
    const [image, setImage] = useState(null)
    const [users, setUsers] = useState({})

    const key = "dcb09ccf64e170735b4f8e64bde83c03"


    console.log(image, 'user');
    const email = user.email

    const handleSubmit = (e) => {
        e.preventDefault()

        // Some promise of base64 data

        const encodePic = image.toString('base64');
        const imageBuffer = Buffer.from(encodePic, 'base64')
        // console.log(encodePic, "buffff")

        const base64str = () =>
            new Promise((resolve) => {
                return setTimeout(() => {
                    resolve(
                        imageBuffer
                        // "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNcLVNbzwAEjDAGACcSA4kB6ARiAAAAAElFTkSuQmCC",
                    );
                }, 1000);
            });

        // Your barebone async function
        const myUrl = async (name) => {
            return await imgbbUploader({
                apiKey: 'dcb09ccf64e170735b4f8e64bde83c03',
                base64string: await base64str(),
                name: name,
            })
                .then((res) => {
                    console.log(`Handle success: ${res.url}`);
                    return res.url;
                })
                .catch((e) => {
                    console.error(`Handle error: ${e}`);
                    return "http://placekitten.com/300/300";
                });
        };
        myUrl(image.name);
        // const formData = new FormData();
        // formData.append('email', email)
        // formData.append('image', image)

        // fetch('https://obscure-waters-41987.herokuapp.com/user', {
        //     method: 'PUT',
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
    }

    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/userByEmail?email=${email}`)
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
                }} src={image ? URL.createObjectURL(image) : user.image} />
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