import React from 'react';
import withAuth from '../hoc/withAuth';

const Register = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default withAuth(Register, 'registration');