import { Box, Button, Paper, Rating, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../shared/button';

const ProductItem = ({ product }) => {
    return (
        <Paper variant='outlined'>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            </Link>
            <Stack sx={{ p: '1rem' }} spacing={1}>
                <Link style={{ color: '#1976d2' }} to={`/product/${product.slug}`}>
                    <Typography variant='h6'>{product.name}</Typography>
                </Link>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Rating value={product.rating} precision={0.5} readOnly></Rating>
                    <Typography variant='h6' sx={{color: 'primary.main'}}>{product.numReviews} reviews</Typography>
                </Stack>
                <Typography sx={{ fontWeight: '500' }}>${product.price}</Typography>
                <Box>
                    <ButtonPrimary
                        variant='contained'>
                        Add to cart
                    </ButtonPrimary>
                </Box>
            </Stack>
        </Paper>
    );
};

export default ProductItem;