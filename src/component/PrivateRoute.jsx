import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const PrivateRoute = () => {
    const {pathname} = useLocation()
    const {isLoggedIn, isChecking} = useAuth()
    if(isChecking){
        return <p>Loading............</p>
    }
    return (
        isLoggedIn? <Outlet/> : <Navigate to='/login' state={{from: pathname}}/>
    );
};

export default PrivateRoute;