import * as React from 'react';
import Button from '@mui/material/Button';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { reset, signout } from '../features/auth/authSlice';
import { resert } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Menu({ name }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = ()=>{
        handleClose()
        dispatch(signout())
        dispatch(resert())
        dispatch(reset())
        navigate('/')
    }

    return (
        <>
            <Button
                sx={{
                    color: 'black',
                    textTransform: 'none',
                    fontSize: '16px',
                    letterSpacing: '1px'
                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
            >
                {name}
            </Button>
            <MuiMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MuiMenu>
        </>
    );
}
