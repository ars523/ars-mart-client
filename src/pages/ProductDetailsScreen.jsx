import { Box, Grid, Paper, Rating, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../component/Error';
import Loader from '../component/Loader';
import { addCart } from '../features/cart/cartSlice';

import { getProduct, reset } from '../features/products/productSlice';
import { ButtonPrimary } from '../shared/button';
import { HeadingPrimary } from '../shared/typography';

const ProductDetailsScreen = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { product, isLoading, isError, isSuccess, error } = useSelector(state => state.product)
    const { carts } = useSelector(state => state.cart)
    const { image, name, numReviews, description, countInStock, price } = product
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset())
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getProduct(slug))
    }, [slug, dispatch])

    const handleAddCart = async () => {
        const isExist = carts.find(c => c._id === product._id)
        const quantity = isExist ? isExist.quantity + 1 : 1
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${slug}`)
        const stock = res.data.countInStock
        if (stock >= quantity) {
            dispatch(addCart(product))
            navigate('/carts')
        } else {
            console.log('Out of stock')
        }
    }

    const style = {
        borderBottom: '1px solid #ddd',
        p: '0.25rem 1rem'
    }

    if(isLoading){
        return <Loader/>
    }
    
    if(isError){
        return <Error message={error}/>
    }
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item md={6} xs={12}> {/* <---First Column---> */}
                    <img style={{ width: '100%' }} src={image} alt="" />
                </Grid>

                <Grid item md={3} xs={12}> {/* <-----Middle column---> */}
                    <HeadingPrimary sx={{ ...style }} variant='h3'>
                        {name}
                    </HeadingPrimary>
                    <Stack direction='row' spacing={1} alignItems='center' sx={{ ...style }}>
                        <Rating value={product.rating || 0} precision={0.5} readOnly></Rating>
                        <Typography variant='h6' sx={{ color: 'primary.main' }}>
                            {numReviews} reviews
                        </Typography>
                    </Stack>
                    <Typography variant='subtitle1' sx={style}>
                        Price: ${price}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ p: '0.25rem 1rem' }}>
                        Description:
                    </Typography>
                    <Typography variant='subtitle1' sx={{ p: '0.25rem 1rem' }}>
                        {description}
                    </Typography>
                </Grid>

                <Grid item md={3} xs={12}> {/* <---Last Column ---> */}
                    <Paper variant='outlined' sx={{ p: '2rem' }}>
                        <Typography variant='subtitle1' sx={style}>
                            Price: <span style={{ display: 'inline-block', marginLeft: '4px' }} /> ${price}
                        </Typography>
                        <Stack direction='row' alignItems='center' columnGap='8px' sx={style}>
                            <Typography variant='subtitle1' >Status:</Typography>
                            <Typography
                                variant='caption'
                                sx={{
                                    display: 'inline-block',
                                    backgroundColor: countInStock ? 'green' : 'red',
                                    p: '0 6px',
                                    color: '#fff',
                                    fontWeight: 500,
                                    borderRadius: '8px',
                                    letterSpacing: '1px'
                                }}
                            >
                                {countInStock ? 'In Stock' : 'Unavailable'}
                            </Typography>
                        </Stack>
                        <Box sx={{ p: '0 1rem' }}>
                            {
                                countInStock
                                    ? <ButtonPrimary
                                        onClick={handleAddCart}
                                        variant='contained'
                                        size='small'
                                        sx={{ mt: '8px' }}
                                        fullWidth
                                    >
                                        Add to cart
                                    </ButtonPrimary>
                                    : null
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetailsScreen;