import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../Firebase/Firebase.init"

const Orders = () => {

    const [user, loading, error] = useAuthState(auth);
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        const url = "http://localhost:5000/orderList";
        fetch(url, {
            headers: {
                'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
                "Content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                setOrderList(data);
            })
    }, [user.email])


    return (
        <div>
            <h2>Total Orders : {orderList.length}</h2>
            <ol>
                {
                    orderList.map(order => <li key = {order._id}>{order.name}</li>)
                }
            </ol>
        </div>
    );
};

export default Orders;