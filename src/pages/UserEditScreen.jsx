import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ButtonPrimary } from '../shared/button';
import { HeadingPrimary } from '../shared/typography';
import { useFormik } from "formik"
import * as yup from "yup"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../features/user/userSlice';
import Loader from '../component/Loader';
import Error from '../component/Error';
import { toast } from 'react-toastify';
import LayoutPrimary from '../layouts/LayoutPrimary';

const UserEditScreen = () => {
    const { userEdit, isLoading, isError, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { id } = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            isAdmin: false,
        },
        validationSchema: yup.object({
            name: yup.string().required("Required"),
            email: yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: (values) => {
            const { name, email, isAdmin } = values
            dispatch(updateUser({ id, name, email, isAdmin }))
                .unwrap()
                .then(() => toast.success('Updated successfully'))
                .catch(error => toast.error(error))
        },
        enableReinitialze: true,

    })

    useEffect(() => {
        dispatch(getUser(id))
    }, [id, dispatch])

    useEffect(() => {
        if (userEdit) {
            formik.setValues({
                name: userEdit.name,
                email: userEdit.email,
                isAdmin: userEdit.isAdmin
            })
        }
        // eslint-disable-next-line
    }, [userEdit])
    const { values, errors, touched } = formik

    if (isError) {
        <Error message={error} />
    }
    return (
        <LayoutPrimary>
            <Container maxWidth='sm'>
                <Grid container component='form' spacing={3} onSubmit={formik.handleSubmit}>
                    <Grid item xs={12}>
                        <HeadingPrimary variant='h3' sx={{ color: '#333' }}>
                            Edit User {id}
                        </HeadingPrimary>
                    </Grid>
                    {
                        isLoading
                            ? (<Loader />)
                            : (<>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder='Name'
                                        fullWidth
                                        size='small'
                                        name='name'
                                        label='Name'
                                        value={values.name}
                                        onChange={formik.handleChange}
                                        helperText={errors.name}
                                        error={errors.name && touched.name}
                                        onBlur={formik.handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder='Email'
                                        fullWidth
                                        size='small'
                                        name='email'
                                        label='Email'
                                        value={values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={errors.email && touched.email}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox name='isAdmin' checked={values.isAdmin} onChange={formik.handleChange} />}
                                        label="Make an admin"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonPrimary type='submit' variant='contained'>Update</ButtonPrimary>
                                </Grid>
                            </>)
                    }

                </Grid>
            </Container>
        </LayoutPrimary>
    );
};

export default UserEditScreen;