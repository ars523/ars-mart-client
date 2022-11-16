import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
const PrivateRoute = () => {
    const {pathname} = useLocation()
    const {isLoggedIn, isChecking} = useAuth()
    if(isChecking){
        return <Loader/>
    }
    return (
        isLoggedIn? <Outlet/> : <Navigate to='/login' state={{from: pathname}}/>
    );
};

export default PrivateRoute;