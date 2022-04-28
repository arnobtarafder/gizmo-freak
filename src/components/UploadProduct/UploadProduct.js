import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../Firebase/Firebase.init"

const UploadProduct = () => {
    const [user, loading, error] = useAuthState(auth)


    const handleUpload = event => {
        event.preventDefault();

        const name = event.target.name.value;
        const description = event.target.description.value;
        const price = event.target.price.value;

        console.log(name, price, description);

        const url = `http://localhost:5000/uploadProduct`
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                name, price, description
            }),
            headers: {
                'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
                "Content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                event.target.reset()
            })
    }

    return (
        <div>
            <h1 className='text-center'>Upload your product here</h1>

            <form className='w-50 mx-auto' onSubmit={handleUpload}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>

                    <input
                        type="text"
                        name='name'
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />

                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>

                    <input
                        type="text"
                        name='description'
                        className="form-control"
                        id="exampleInputPassword1" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Price</label>

                    <input
                        type="number"
                        name='price'
                        className="form-control"
                        id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
    );
};

export default UploadProduct;