import { Box, Button, Card, Grid, IconButton, Paper, Rating, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../component/Error';
import Loader from '../component/Loader';
import { addCart } from '../features/cart/cartSlice';

import { getProduct, reset } from '../features/products/productSlice';
import { ButtonPrimary } from '../shared/button';
import { HeadingPrimary } from '../shared/typography';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';

const ProductDetailsScreen = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { product, isLoading, isError, isSuccess, error } = useSelector(state => state.product)
    const { carts } = useSelector(state => state.cart)
    const { image, name, numReviews, description, countInStock, price, brand } = product
    const [cartQunatity, setCartQuantity] = useState(null)
    const dispatch = useDispatch()
    const theme = useTheme()

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset())
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getProduct(slug))
    }, [slug, dispatch])

    const checkProductExistanceInCart = (cartItem) => {
        const isExist = carts.find(cart => cart._id === cartItem._id)
        return isExist;
    }

    useEffect(() => {
        setCartQuantity(checkProductExistanceInCart(product)?.quantity || 1)
    }, [product])

    const handleAddCart = async (quantity) => {
        quantity = +quantity
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${slug}`)
        const stock = res.data.countInStock
        if (stock >= quantity) {
            dispatch(addCart({ product, quantity }))
            navigate('/carts')
        } else {
            toast.error('Out of stock')
        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error message={error} />
    }
    return (
        <Container>
            <Grid container spacing={'2.5rem'}>
                <Grid item md={4} xs={12}>
                    <Paper variant='outlined'>
                        <img style={{ width: '100%' }} src={image} alt="" />
                    </Paper>
                </Grid>
                <Grid item md={8} xs={12}>
                    <Typography variant='h4' sx={{ fontWeight: '500', mb: '0.5rem' }}>{name}</Typography>
                    <Typography variant='body2' sx={{ textTransform: 'capitalize' }} color={'GrayText'}>By {brand}</Typography>
                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                        style={{ marginBottom: '1rem' }}
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
                        <Typography variant='subtitle2' sx={{ color: 'GrayText' }}>
                            {numReviews}
                            reviews
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} sx={{ mb: '1rem' }}>
                        <Paper elevation={0} sx={{ padding: '0.5rem 0.75rem', display: 'flex', background: 'rgb(243 244 246)' }}>
                            <span style={{ marginTop: '0.25rem', marginRight: '0.25rem' }}>$</span>
                            <Typography variant='h4' sx={{ fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: 700 }}>{price}</Typography>
                        </Paper>
                        <Box>
                            <Typography color={'secondary'} variant='h6'>Save 12%</Typography>
                            <Typography variant='caption' color={'GrayText'}>Inclusive of all Taxes.</Typography>
                        </Box>
                    </Stack>
                    <Typography variant='body1' color={'GrayText'} sx={{ mb: '1rem' }}>{description}</Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={'2rem'}>
                        {
                            cartQunatity && <TextField
                                type='number'
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                value={cartQunatity}
                                size='small'
                                sx={{ width: '4rem' }}
                                onChange={(e) => setCartQuantity(e.target.value)}
                            />
                        }
                        {
                            countInStock === 0
                                ? (
                                    <ButtonPrimary variant='contained' disabled>Out of Stock</ButtonPrimary>
                                ) :
                                <ButtonPrimary
                                    startIcon={checkProductExistanceInCart(product)?<CheckCircleIcon/>:<ShoppingCartIcon />}
                                    variant='contained'
                                    onClick={() => handleAddCart(cartQunatity)}
                                >
                                    {checkProductExistanceInCart(product)?'Update Quantity':'Add to Cart'}
                                </ButtonPrimary>
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetailsScreen;