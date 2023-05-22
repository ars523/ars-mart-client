import { Grid, Container, Typography, TableContainer, Paper, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TablePrimary from '../component/TablePrimary';
import { deleteUser, getAllUsers } from '../features/user/userSlice';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import { toast } from 'react-toastify';
import LayoutPrimary from '../layouts/LayoutPrimary';
const UsersListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users, isLoading, isError, error } = useSelector((state) => state.user)
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(10)

    useEffect(() => {
        dispatch(getAllUsers({ page: page + 1, pageSize: rowPerPage }))
    }, [dispatch, page, rowPerPage])

    const handlePageChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
    }

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
    return (
        <LayoutPrimary>
            <Container>
                <Grid container direction='column' spacing={'1.5rem'}>
                    <Grid item>
                        <Typography variant='h5' sx={{ color: 'grey.900' }}>
                            Users
                        </Typography>
                    </Grid>
                    <Grid item>
                        {
                            isLoading? (<Loader/>):
                            isError ? (<Error message={error} />):
                            users.length === 0? <Error message='No Users found' />:
                            (<TableContainer component={Paper}>
                                <TablePrimary data={users?.users} columns={columns} actions={actions} />
                                <TablePagination
                                    component="div"
                                    count={users?.countUsers}
                                    page={page}
                                    onPageChange={handlePageChangePage}
                                    rowsPerPage={rowPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>)
                        }
                    </Grid>
                </Grid>
            </Container>
        </LayoutPrimary>
    );
};

export default UsersListScreen;