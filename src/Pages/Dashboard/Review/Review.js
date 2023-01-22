import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Rating from 'react-rating';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth/useAuth';

const Review = () => {
    const [rating, setRating] = useState('')
    const [text, setText] = useState('')
    const { user } = useAuth();
    const [users, setUsers] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fetch(`https://car-repair-server-production.up.railway.app/userByEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const review = { text: text, rating: rating, user: users }

        setIsLoading(true)
        fetch('https://car-repair-server-production.up.railway.app/review', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                swal("Good job!", "Congratulations Review done.", "success")


            })
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
                    {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                        : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                </form>
            </div>
        </div>
    );
};

export default Review;