import { Grid, Container, Typography, TableContainer, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TablePrimary from '../component/TablePrimary';
import { deleteUser, getAllUsers } from '../features/user/userSlice';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { HeadingPrimary } from '../shared/typography';
import Loader from '../component/Loader';
import Error from '../component/Error';
import { toast } from 'react-toastify';
const UsersListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users, isLoading, isError, error } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const columns = [
        { heading: 'Id', value: '_id' },
        { heading: 'Name', value: 'name' },
        { heading: 'Email', value: 'email' },
        { heading: 'Admin', value: 'isAdmin' },
        { heading: 'Actions', value: 'actions' }
    ]

    const actions = [
        {
            name: 'Edit',
            value: 'edit',
            onclick: (id) => {
                navigate(`/admin/users/${id}`)
            }
        },
        {
            name: 'Delete',
            value: 'delete',
            onclick: (id) => {
                if (window.confirm("Are you sure to delete?")) {
                    dispatch(deleteUser(id))
                        .unwrap()
                        .then(() => toast.success("Deleted successfully"))
                        .catch(error => toast.error(error))
                }
            }
        }
    ]

    if (isLoading) {
        return <Loader />
    }
    else if (isError) {
        return <Error message={error} />
    }
    else if (users.length === 0) {
        return <Error message='No Users found' />
    }
    return (
        <Container>
            <Grid container direction='column' rowSpacing='2rem'>
                <Typography variant='h5' sx={{ color: 'grey.900' }}>
                    Users
                </Typography>
                <Grid item container justifyContent='space-between'>
                    <TableContainer component={Paper}>
                        <TablePrimary data={users} columns={columns} actions={actions} />
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersListScreen;