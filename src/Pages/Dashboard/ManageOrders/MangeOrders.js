import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import useAuth from './../../../hooks/useAuth/useAuth';


const Orders = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(orders);
    useEffect(() => {
        fetch(`https://car-repair-server-production.up.railway.app/orders`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setIsLoading(false)
            })
    }, [])



    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "You went to log Out!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your are successfully log Out!", {
                        icon: "success",
                    });

                    fetch(`https://car-repair-server-production.up.railway.app/order/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.deletedCount > 0) {
                                const remainingService = orders.filter(service => service._id !== id)
                                setOrders(remainingService)
                            }
                        })


                } else {
                    swal("Service is not delete!");

                }
            });
    }


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
                                <td><button onClick={() => handleDelete(row._id)} className="btn btn-warning">Delete</button></td>

                            </tr>
                        ))}

                    </tbody>
                </Table>}
        </div>
    );
};

export default Orders;