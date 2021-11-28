import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import useAuth from '../../../hooks/useAuth/useAuth';

const Review = () => {
    const [rating, setRating] = useState('')
    const [text, setText] = useState('')
    const { user } = useAuth();
    const [users, setUsers] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/userByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const review = { text: text, rating: rating, user: users }
        // console.log(text, rating);
        fetch('http://localhost:5000/review', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <h1 className="text-center primary-color">Testimonial</h1>
            <hr />
            <div className="w-50 mx-auto">
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control onChange={(e) => setText(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>

                    <Rating
                        initialRating={2}
                        className="text-warning my-3"
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        fractions={2}
                        onChange={(rate) => setRating(rate)}
                    /> <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Review;