import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Products = () => {
    const [products, setProducts] = useState([]);
    const [user, loading] = useAuthState(auth);
    console.log(products);
    
    useEffect(() => {
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    
        if(loading) {
            return <p className='text-center'>Loading...</p>
        }
        

    const handleOrder = (product) => {
        const {name, price, photo} = product;
        console.log(product, photo);

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                photo,
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

            <div className="row container-fluid">
                {
                    products.map(pd => (
                       <div className='col-lg-4 col-md-6 col-sm-12 g-4' key={pd._id}>
                            <div className="card">
                            <img src={products.photo} className="img-fluid card-img-top" alt="..." />
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