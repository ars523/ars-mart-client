import React from 'react';
import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import Menu from './Menu';
import { reset, signout } from '../features/auth/authSlice';
import { resert } from '../features/cart/cartSlice';
import LoginIcon from '@mui/icons-material/Login';
const Header = () => {
    const { isLoggedIn, admin } = useAuth()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)
    const handleLogin = () => {
        navigate('/login')
    }
    const userItems = [
        {
            item: 'Profile',
            onclick: () => navigate('/profile')
        },
        {
            item: 'Order History',
            onclick: () => navigate('/orderHistory')

        },
        {
            item: 'Logout',
            onclick: () => {
                dispatch(signout())
                dispatch(resert())
                dispatch(reset())
                navigate('/')
            }
        }
    ]

    const adminItems = [
        {
            item: 'Dashboard',
            onclick: () => navigate('/admin/dashboard')
        },
        {
            item: 'Products',
            onclick: () => navigate('/admin/productlist')
        },
        {
            item: 'Orders',
            onclick: () => navigate('/admin/orders')
        },
        {
            item: 'Users',
            onclick: () => navigate('/admin/users')
        }
    ]
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '4px 4px',
        },
    }));
    return (
        <AppBar sx={{ background: '#fff' }} elevation={1}>
            <Toolbar >
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography
                        variant='h6'
                        color='primary'
                        sx={{
                            letterSpacing: '2px',
                            fontWeight: '800px',
                        }}
                    >
                        ARS-Fashion
                    </Typography>
                </Link>
                <Box component='div' sx={{ ml: 'auto' }}>
                    <Stack direction={'row'} spacing={3} alignItems={'center'}>
                        <IconButton
                            aria-label="cart"
                            onClick={() => navigate('/carts')}
                        >
                            <StyledBadge
                                badgeContent={carts.length}
                                color='primary'
                            >
                                <ShoppingCartIcon color='primary' />
                            </StyledBadge>
                        </IconButton>
                        {
                            isLoggedIn
                                ? (
                                    <Menu name={user?.name?.split(' ')[0]} menuItems={userItems} />
                                ) : (
                                    <Button
                                        onClick={handleLogin}
                                        variant='outlined'
                                        startIcon={<LoginIcon/>}
                                    >
                                        Sign In
                                    </Button>
                                )
                        }
                        {
                            (isLoggedIn && admin) &&
                            (
                                <Menu name={'Admin'} menuItems={adminItems} />
                            )
                        }
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;