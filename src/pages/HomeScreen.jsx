import React from 'react';
import { Grid, Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../features/products/productSlice';
import ProductItem from '../component/ProductItem';
import Loader from '../component/Loader';
import Error from '../component/Error';
import LayoutPrimary from '../layouts/LayoutPrimary';
import Hero from '../component/Hero';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const HomeScreen = () => {
    const dispatch = useDispatch()
    const { products, isLoading, isError, error } = useSelector(state => state.product)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <LayoutPrimary headerBottomGap={'0px'}>
            <Hero />
            <Container>
                {
                    isLoading
                        ? (<Loader />)
                        : isError
                            ? (<Error message={error} />)
                            : (<Grid container spacing={{ xs: 2, md: 4 }} sx={!matches && { position: 'relative', top: '-200px', marginBottom: '-200px' }}>
                                {
                                    products?.map(product => (
                                        <Grid item xs={12} md={3} key={product._id}>
                                            <ProductItem product={product} />
                                        </Grid>
                                    ))
                                }
                            </Grid>)
                }
                <div style={{width:'100%', height:'1px'}}></div>
            </Container>
        </LayoutPrimary>
    );
};

export default HomeScreen;