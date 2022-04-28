import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../Firebase/Firebase.init"

const Orders = () => {

    const [user, loading, error] = useAuthState(auth);
    const [orderList, setOrderList] = useState([]);

    
    
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
        
        if(loading) {
            return <p className='text-center'>Loading...</p>
        }

        

    return (
        <div>
            <h2>Total Orders : {orderList.length}</h2>
            <ol>
                {
                    orderList.map(order => (
                        <div className='col-4 g-4' key={order._id}>
                             <div className="card">
                                 <img src={order.photo} alt="" />
                             <div className="card-body">
                                 <h5 className="card-title">{order.name}</h5>
                             </div>
 
                             <div>
                                 <p className="list-group list-group-flush">{order.description}</p>
                             </div>
 
                             <ul className="list-group list-group-flush">
                                 <li className="list-group-item">Price: {order.price}</li>
                             </ul>
                             <div className="card-body">
                             </div>
                         </div>
                        </div>
                     ))
                }
            </ol>
        </div>
    );
};

export default Orders;