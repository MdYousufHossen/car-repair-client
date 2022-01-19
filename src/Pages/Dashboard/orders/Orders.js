import React, { useState, useEffect } from 'react';
import { Row, Table } from 'react-bootstrap';
import useAuth from './../../../hooks/useAuth/useAuth';


const Orders = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    console.log(orders);
    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/orderbyEmail?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user.email])

    const handleDelete = (id) => {
        fetch(`https://obscure-waters-41987.herokuapp.com/order/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleteCount > 0) {
                    const remainingService = orders.filter(service => service._id !== id)
                    setOrders(remainingService)
                }
            })
    }

    return (
        <div>
            <h1 className="text-center primary-color mb-3">Your Orders</h1>

            <Table striped bordered hover>
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
                            <td ><button onClick={() => handleDelete(row._id)} className="btn btn-warning">Delete</button></td>

                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    );
};

export default Orders;