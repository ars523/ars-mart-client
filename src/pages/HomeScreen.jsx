import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../features/products/productSlice';
import ProductItem from '../component/ProductItem';
import { HeadingPrimary } from '../shared/typography';
import Loader from '../component/Loader';
import Error from '../component/Error';
import LayoutPrimary from '../layouts/LayoutPrimary';
const HomeScreen = () => {
    const dispatch = useDispatch()
    const { products, isLoading, isError, error } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <LayoutPrimary>
            <Container>
                {
                    isLoading
                        ? (<Loader />)
                        : isError
                            ? (<Error message={error} />)
                            : (<Grid container direction='column' spacing={'1.5rem'}>
                                <Grid item>
                                    <Typography variant='h5'>
                                        Featured Products
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={{ xs: 2, md: 4 }} sx={{ pr: '1rem' }}>
                                        {
                                            products?.map(product => (
                                                <Grid item xs={6} md={3} key={product._id}>
                                                    <ProductItem product={product} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>)
                }
            </Container>
        </LayoutPrimary>
    );
};

export default HomeScreen;