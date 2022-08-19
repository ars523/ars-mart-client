import { Box, Paper, Rating, Typography, Stack } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../features/cart/cartSlice';
import { ButtonPrimary } from '../shared/button';
import { LinkPrimary } from '../shared/link';

const ProductItem = ({ product }) => {

    const { carts } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleAddCart = async (cartItem) => {
        const isExist = carts.find(cart => cart._id === cartItem._id)
        const quantity = isExist ? isExist.quantity + 1 : 1;
        const res = await axios.get(`/api/products/${cartItem.slug}`)
        const stock = res.data.countInStock
        if (quantity <= stock) {
            dispatch(addCart(cartItem))
        } else {
            console.log('Out of stock')
        }
    }

    return (
        <Paper variant='outlined'>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            </Link>
            <Stack sx={{ p: '1rem' }} spacing={1}>
                <LinkPrimary to={`/product/${product.slug}`}>
                    <Typography variant='h6'>{product.name}</Typography>
                </LinkPrimary>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Rating value={product.rating} precision={0.5} readOnly></Rating>
                    <Typography variant='h6' sx={{ color: 'primary.main' }}>{product.numReviews} reviews</Typography>
                </Stack>
                <Typography sx={{ fontWeight: '500' }}>${product.price}</Typography>
                <Box>
                    {
                        product.countInStock === 0
                            ? (
                                <ButtonPrimary disabled>Out of Stock</ButtonPrimary>
                            )
                            : (
                                <ButtonPrimary
                                    onClick={() => handleAddCart(product)}
                                    variant='contained'
                                >
                                    Add to cart
                                </ButtonPrimary>
                            )
                    }
                </Box>
            </Stack>
        </Paper>
    );
};

export default ProductItem;