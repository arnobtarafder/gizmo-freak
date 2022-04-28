import React, { useEffect, useState } from 'react';


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <h1>Total Products: {products.length}</h1>

            <div className="row">
                {
                    products.map(product => (
                       <div className='col-4 g-4' key={product._id}>
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                            </div>

                            <div>
                                <p className="list-group list-group-flush">{product.description}</p>
                            </div>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Price: {product.price}</li>
                            </ul>
                            <div className="card-body">
                                <button className="btn btn-primary">Go somewhere</button>
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