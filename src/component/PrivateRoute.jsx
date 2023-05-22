import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import Loader from './Loader';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
    const {user} =  useSelector(state=>state.auth)
    const {pathname} = useLocation()
    // const {isLoggedIn, isChecking} = useAuth()
    // if(isChecking){
    //     return <Loader/>
    // }
    return (
        user? <Outlet/> : <Navigate to='/login' state={{from: pathname}}/>
    );
};

export default PrivateRoute;