import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import auth from '../../Firebase/Firebase.init';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/home">Gizmo Freak</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productUpload">Upload Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        {
                            user
                                ?
                                <span>
                                    {user.displayName}
                                    <button 
                                    className='btn btn-link'
                                    onClick={() => signOut(auth)}
                                    >Sign Out</button>
                                </span>
                                :
                                <span>USER</span>
                        }
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;