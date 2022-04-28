import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Products = () => {
    const [products, setProducts] = useState([]);
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleOrder = (product) => {
        const {name, price} = product;
        console.log(product, user.email);

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                email: user.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success(data.success)
            });
    }

    return (
        <div>
            <ToastContainer />
            <h1>Total Products: {products.length}</h1>

            <div className="row">
                {
                    products.map(pd => (
                       <div className='col-4 g-4' key={pd._id}>
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{pd.name}</h5>
                            </div>

                            <div>
                                <p className="list-group list-group-flush">{pd.description}</p>
                            </div>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Price: {pd.price}</li>
                            </ul>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => handleOrder(pd)}>Order Now</button>
                            </div>
                        </div>
                       </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;