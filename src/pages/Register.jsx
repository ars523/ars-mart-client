import React, { useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { HeadingPrimary } from '../shared/typography';
import { LinkPrimary } from '../shared/link';
import { signup, reset } from '../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';


const Register = () => {
    const dispatch = useDispatch()
    const { user, isSuccess } = useSelector(state => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const hitFrom = location?.state?.from
    const go = hitFrom ? hitFrom : '/'
    useEffect(() => {
        if (isSuccess || user) {
            navigate(`${go}`)
            dispatch(reset())
        }
    }, [user, isSuccess, navigate, go, dispatch])
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: yup.object({
            name: yup.string().max(15, "Must be 15 characters or less").required("Required"),
            email: yup.string().email("Invalid email address").required("Required"),
            password: yup.string().min(6, "Password is too short").required("Required"),
            confirmPassword: yup
                .string()
                .required('Please retype your password.')
                .oneOf([yup.ref('password'), null], "Passwords doesn't match")
        }),
        onSubmit: (values) => {
            dispatch(signup(values))
        }
    })

    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = formik
    const {name, email, password, confirmPassword } = values
    return (
        <Container maxWidth='sm' sx={{ p: '30px' }}>
            <Grid container rowSpacing={2} component='form' onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <HeadingPrimary variant="h4">
                        Sign Up
                    </HeadingPrimary>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder='Name'
                        label='Name'
                        size='small'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name?.length > 0}
                        helperText={touched.email && errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder='Email'
                        label='Email'
                        size='small'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email?.length > 0}
                        helperText={touched.email && errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder='Password'
                        label='Password'
                        type='password'
                        size='small'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password?.length > 0}
                        helperText={touched.email && errors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder='Confirm Password'
                        label='Confirm Password'
                        type='password'
                        size='small'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && errors.confirmPassword?.length > 0}
                        helperText={touched.email && errors.confirmPassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' size='small' type='submit'>Submit</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        Have an account?
                        <LinkPrimary to='/login' style={{ marginLeft: '1rem' }}>
                            Sign in
                        </LinkPrimary>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register