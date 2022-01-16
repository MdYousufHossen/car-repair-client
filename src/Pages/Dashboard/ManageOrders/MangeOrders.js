import React, { useState, useEffect } from 'react';
import { Row, Spinner, Table } from 'react-bootstrap';
import useAuth from './../../../hooks/useAuth/useAuth';


const Orders = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(orders);
    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/orders`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setIsLoading(false)
            })
    }, [])
    return (
        <div>
            <h1 className="text-center primary-color mb-3">Manage Orders</h1>

            {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" /></div>
                : <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>UserName</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(row => (
                            <tr key={row._id}>
                                <td>{row.userName}</td>
                                <td>{row.service.name}</td>
                                <td>$ {row.service.price}</td>
                                <td> <img src={row.service.image} className="w-25" alt="" /> </td>
                                <td><button className="btn btn-warning">Delete</button></td>

                            </tr>
                        ))}

                    </tbody>
                </Table>}
        </div>
    );
};

export default Orders;