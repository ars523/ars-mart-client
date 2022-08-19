import React from 'react';
import withAuth from '../hoc/withAuth';

const Login = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default withAuth(Login);