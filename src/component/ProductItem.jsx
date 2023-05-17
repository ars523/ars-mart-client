import { Box, Paper, Rating, Typography, Stack, useTheme } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { addCart } from '../features/cart/cartSlice';
import { ButtonPrimary } from '../shared/button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProductItem = ({ product }) => {

    const { carts } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme();

    const checkProductExistanceInCart = (cartItem)=>{
        const isExist = carts.find(cart => cart._id === cartItem._id)
        return isExist;
    }
    const handleAddCart = async (cartItem) => {
        const isExist = checkProductExistanceInCart(cartItem)
        const quantity = isExist ? isExist.quantity + 1 : 1;
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${cartItem.slug}`)
        const stock = res.data.countInStock
        if (quantity <= stock) {
            dispatch(addCart(cartItem))
        } else {
            console.log('Out of stock')
        }
    }

    return (
        <Paper
            onClick={() => navigate(`/product/${product.slug}`)}
            variant='outlined'
            sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.04)',
                }
            }}
        >

            <img src={product.image} alt={product.name} style={{ width: '100%' }} />

            <Stack sx={{ p: '1rem' }} spacing={1}>
                <Typography
                    variant='h6'
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.name}
                </Typography>
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    style={{marginBottom:'1rem'}}
                >
                    <Rating
                        value={product.rating}
                        precision={0.5} readOnly
                        size='small'
                        sx={{
                            "& .MuiRating-iconFilled": {
                                color: `${theme.palette.primary.main}`
                            },
                        }}
                    />
                    <Typography variant='subtitle2' sx={{ color: 'GrayText' }}>{product.numReviews} reviews</Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='subtitle1'>${product.price}</Typography>
                    <Box>
                        {
                            product.countInStock === 0
                                ? (
                                    <ButtonPrimary disabled>Out of Stock</ButtonPrimary>
                                ):
                                checkProductExistanceInCart(product)?
                                (<ButtonPrimary
                                    variant='contained'
                                    startIcon={<CheckCircleIcon/>}
                                    onClick={(event) => { navigate('/carts'); event.stopPropagation() }}
                                >
                                    Added in Cart
                                </ButtonPrimary>)
                                : (
                                    <ButtonPrimary
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={(event) => { handleAddCart(product); event.stopPropagation() }}
                                        variant='contained'
                                    >
                                        Add to Cart
                                    </ButtonPrimary>
                                )
                        }
                    </Box>
                </Stack>
            </Stack>
        </Paper >
    );
};

export default ProductItem;