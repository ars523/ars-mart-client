import React from 'react';
import { Grid, Container} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts} from '../features/products/productSlice';
import ProductItem from '../component/ProductItem';
import { HeadingPrimary } from '../shared/typography';
import Loader from '../component/Loader';
import Error from '../component/Error';
const HomeScreen = () => {
    const dispatch = useDispatch()
    const { products, isLoading, isError, error } = useSelector(state => state.product)
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    
    return (
        <Container>
            {
                isLoading 
                ?(<Loader/>) 
                :isError
                ?(<Error message={error}/>)
                :(<Grid container direction='column' spacing={4}>
                    <Grid item>
                        <HeadingPrimary sx={{ mb: '0.5rem' }} variant='h4'>
                            Featured Products
                        </HeadingPrimary>
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

                </Grid>)
            }
        </Container>
    );
};

export default HomeScreen;