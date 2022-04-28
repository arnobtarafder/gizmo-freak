import React, { useEffect } from 'react';
import auth from '../../Firebase/Firebase.init';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [user, loading, error] = useAuthState(auth)
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }

    useEffect(()=>{
        let from = location.state?.from?.pathname || "/";
        if (user) {
        navigate(from, { replace: true })
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