import { Box, Button, Grid, Paper, Rating, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct, reset } from '../features/products/productSlice';
import { ButtonPrimary } from '../shared/button';

const Product = () => {
    const { slug } = useParams()
    const { product, isLoading, isError, isSuccess } = useSelector(state => state.product)
    const { image, name, numReviews, description, countInStock, price } = product
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     return ()=>{
    //         if(isSuccess){
    //             dispatch(reset())
    //         }
    //     }
    // },[])
    useEffect(() => {
        dispatch(getProduct(slug))
    }, [slug, dispatch])

    const style = {
        borderBottom: '1px solid #ddd',
        p: '0.25rem 1rem'
    }

    if (isLoading) {
        return <p>Loading...............</p>
    }
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item md={6}> {/* <---First Column---> */}
                    <img style={{ width: '100%' }} src={image} alt="" />
                </Grid>

                <Grid item md={3}> {/* <-----Middle column---> */}
                    <Typography sx={{ fontWeight: '500', ...style }} variant='h3'>
                        {name}
                    </Typography>
                    <Stack direction='row' spacing={1} alignItems='center' sx={{ ...style }}>
                        <Rating value={product.rating || 0} precision={0.5} readOnly></Rating>
                        <Typography variant='h6' sx={{ color: 'primary.main' }}>{numReviews} reviews</Typography>
                    </Stack>
                    <Typography variant='subtitle1' sx={style}>Price: ${price}</Typography>
                    <Typography variant='subtitle1' sx={{ p: '0.25rem 1rem' }}>Description:</Typography>
                    <Typography variant='subtitle1' sx={{ p: '0.25rem 1rem' }}>{description}</Typography>
                </Grid>

                <Grid item md={3}> {/* <---Last Column ---> */}
                    <Paper variant='outlined' sx={{ p: '2rem' }}>
                        <Typography variant='subtitle1' sx={style}>
                            Price: <span style={{display: 'inline-block', marginLeft: '4px'}} /> ${price}
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
                                    ? <ButtonPrimary variant='contained' size='small' sx={{ mt: '8px' }} fullWidth>
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

export default Product;