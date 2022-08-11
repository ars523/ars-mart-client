import React from 'react';
import { Grid, Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts, reset } from '../features/products/productSlice';
import ProductItem from '../component/ProductItem';
const Home = () => {
    const dispatch = useDispatch()
    const { products, isLoading, isSuccess, isError } = useSelector(state => state.product)

    useEffect(() => {
        if (isSuccess) {
            return () => {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    if (isLoading) {
        return <p>Loading........</p>
    }
    return (
        <Container>
            <Grid container direction='column'>
                <Grid item>
                    <Typography sx={{ fontWeight: '600', mb: '0.5rem' }} variant='h4'>
                        Featured Products
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={4}>
                        {
                            products?.map(product => (
                                <Grid item md={3} key={product._id}>
                                    <ProductItem product={product} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    );
};

export default Home;