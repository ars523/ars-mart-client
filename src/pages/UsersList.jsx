import { Grid, Container} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TablePrimary from '../component/TablePrimary';
import { deleteUser, getAllUsers } from '../features/user/userSlice';
import { useSelector} from "react-redux";
import { useNavigate} from 'react-router-dom';
const UsersList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {users} = useSelector((state)=>state.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])
    const columns = [
        {heading: 'Id',value: '_id'}, 
        {heading: 'Name', value: 'name'}, 
        {heading: 'Email', value:'email'}, 
        {heading: 'Admin', value: 'isAdmin'}, 
        {heading: 'Actions', value: 'actions'}
    ]
    const actions = [
        {
            name: 'Edit',
            onclick: (id)=>{
                navigate(`/admin/users/${id}`)
            }
        },
        {
            name: 'Delete',
            onclick: (id)=>{
                dispatch(deleteUser(id))
            }
        }
    ]
    return(
        <Container>
            <Grid container direction='column' rowSpacing='1rem'>
                <Grid item container justifyContent='space-between'>
                    <TablePrimary data = {users} columns={columns} actions={actions}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersList;