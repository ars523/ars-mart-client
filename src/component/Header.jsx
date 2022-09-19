import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
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
            item: 'profile',
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
            onclick: ()=>navigate('/admin/dashboard')
        },
        {
            item: 'Products',
            onclick: ()=>navigate('/admin/productlist')
        },
        {
            item: 'Orders',
            onclick: ()=>navigate('/admin/orders')
        },
        {
            item: 'Users',
            onclick: ()=>navigate('/admin/users')
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
        <Box>
            <AppBar>
                <Toolbar>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Typography
                            variant='h5'
                            sx={{
                                letterSpacing: '2px',
                                fontWeight: '600px',
                                color: 'black'
                            }}
                        >
                            arsmart
                        </Typography>
                    </Link>
                    <IconButton
                        aria-label="cart"
                        onClick={() => navigate('/carts')}
                    >
                        <StyledBadge
                            badgeContent={carts.reduce((a, i) => a + i.quantity, 0)}
                            sx={{ color: 'black' }}
                        >
                            <ShoppingCartIcon sx={{ color: 'black' }} />
                        </StyledBadge>
                    </IconButton>
                    <Box component='div' sx={{ ml: 'auto' }}>
                        {
                            isLoggedIn
                                ? (
                                    <Menu name={user?.name} menuItems={userItems} />
                                ) : (
                                    <Button onClick={handleLogin} sx={{ color: 'black' }}>Sign In</Button>
                                )
                        }
                        {
                            (isLoggedIn && admin) &&
                                (
                                    <Menu name={'Admin'} menuItems={adminItems} />
                                )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;