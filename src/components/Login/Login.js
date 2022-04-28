import React, { useEffect } from 'react';
import auth from '../../Firebase/Firebase.init';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [user, loading, error] = useAuthState(auth)
    let navigate = useNavigate();
    let location = useLocation();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }

    useEffect(()=>{
        let from = location.state?.from?.pathname || "/";
        if (user) {
            
            const url = "http://localhost:5000/login"
            fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: user.email
            }),
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("accessToken", data.token)
            navigate(from, { replace: true })
        })
        }
        },[user])

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                type='button'
                className="btn btn-warning"
            >Google Sign in</button>
        </div>
    );
};

export default Login;