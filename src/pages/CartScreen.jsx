import React from 'react';
import axios from 'axios'
import { Box, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../shared/button';
import { HeadingPrimary } from '../shared/typography';
import { increaseQuantity, deleteCart, subtractCart } from '../features/cart/cartSlice';
import { LinkPrimary } from '../shared/link';
import { toast } from 'react-toastify';
import LayoutPrimary from '../layouts/LayoutPrimary';

const CartScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { carts } = useSelector(state => state.cart)

    const handleIncreseCart = async (cartItem) => {
        const isExist = carts.find(c => c._id === cartItem._id)
        const quantity = isExist ? isExist.quantity + 1 : 1
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${cartItem.slug}`)
        const stock = res.data.countInStock
        if (stock >= quantity) {
            dispatch(increaseQuantity(cartItem))
        } else {
            toast.error('Out of stock')
        }
    }

    const handleSubtractCart = (id) => {
        dispatch(subtractCart(id))
    }

    const handleDeteCart = (id) => {
        dispatch(deleteCart(id))
    }
    return (
        <LayoutPrimary>
            <Container>
                <Grid container direction='column'>
                    <Grid item>
                        <HeadingPrimary
                            variant='h5'
                            sx={{ mb: '1rem' }}
                        >
                            Shopping Cart
                        </HeadingPrimary>
                    </Grid>
                    {carts.length > 0 ?
                        (<Grid item>
                            <Grid container spacing={4}>
                                <Grid item md={8} xs={12}> {/*<----Cart Items---->*/}
                                    <TableContainer>
                                        <Paper variant='outlined'>
                                            <Table>
                                                <TableBody>
                                                    {
                                                        carts.map(cart => (
                                                            <TableRow key={cart.slug}>
                                                                <TableCell>
                                                                    <Stack direction='row' alignItems='center' spacing={1}>
                                                                        <Paper sx={{ width: '48px' }} variant='outlined'>
                                                                            <img src={cart.image} style={{ width: '100%' }} alt="" />
                                                                        </Paper>
                                                                        <LinkPrimary
                                                                            to={`/product/${cart.slug}`}
                                                                        >
                                                                            <Typography sx={{ fontWeight: '500' }}>{cart.name}</Typography>
                                                                        </LinkPrimary>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Stack direction='row' spacing={2} alignItems='center'>
                                                                        <IconButton onClick={() => handleSubtractCart(cart._id)} disabled={cart.quantity < 2}>
                                                                            <RemoveCircleOutlinedIcon />
                                                                        </IconButton>
                                                                        <Typography variant='subtitle1'>
                                                                            {cart.quantity}
                                                                        </Typography>
                                                                        <IconButton onClick={() => handleIncreseCart(cart)}>
                                                                            <AddCircleOutlinedIcon />
                                                                        </IconButton>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant='subtitle1'>${cart.price}</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <IconButton onClick={() => handleDeteCart(cart._id)}>
                                                                        <DeleteIcon color="error" />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </TableContainer>
                                </Grid>
                                <Grid item md={4} xs={12}> {/*<----Checkout---->*/}
                                    <Paper variant='outlined' sx={{ p: '1rem' }}>
                                        <Box sx={{ borderBottom: '1px solid #ddd' }}>
                                            <Typography variant='subtitle2' align='center' sx={{ pb: '0.5rem' }}>
                                                {`${carts.reduce((a, i) => a + i.quantity, 0)} items in your Cart`}
                                            </Typography>
                                        </Box>
                                        <Stack
                                            sx={{
                                                borderBottom: '1px solid #ddd',
                                                padding: '0.5rem',
                                            }}
                                            direction={'row'}
                                            justifyContent={'space-between'}
                                            alignItems={'centre'}
                                        >
                                            <Typography variant='subtitle2'>
                                                Subtotal:
                                            </Typography>
                                            <Typography variant='body2'>
                                                {`$${carts.reduce((a, i) => a + (i.price * i.quantity), 0)}`}
                                            </Typography>
                                        </Stack>
                                        <ButtonPrimary
                                            sx={{ mt: '1rem' }}
                                            variant='contained'
                                            fullWidth
                                            onClick={() => navigate('/shipping')}
                                        >
                                            Proceed to Checkout
                                        </ButtonPrimary>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>) :
                        (
                            <Paper variant='outlined' sx={{ p: '1rem', mt: '1rem' }}>
                                <Typography
                                    variant={'h6'}
                                    sx={{ color: 'error.main' }}
                                >
                                    No items available
                                </Typography>
                                <LinkPrimary to='/'>
                                    <Typography variant='subtitle1'>
                                        Go to Shopping
                                    </Typography>
                                </LinkPrimary>
                            </Paper>
                        )
                    }
                </Grid>
            </Container>
        </LayoutPrimary>
    );
};

export default CartScreen;