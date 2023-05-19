import { Grid, Typography } from '@mui/material';
import React from 'react';

const OrderSummery = ({itemsPriece, totalPrice, taxPrice, shippingPrice}) => {
    return (
        <>
            <Typography variant='h6' sx={{ fontWeight: '500' }}>Order Summery</Typography>
            {/* <---Items Price --->*/}
            <Grid container sx={{ borderBottom: '1px solid #ddd' }}>
                <Grid item xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{p: '0.5rem 1rem'}}
                    >
                        Items
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{ p: '0.5rem 1rem' }}
                    >
                        ${itemsPriece}
                    </Typography>
                </Grid>
            </Grid>
            {/* <---Shipping Price ---> */}
            <Grid container sx={{ borderBottom: '1px solid #ddd' }}>
                <Grid item xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{p: '0.5rem 1rem' }}
                    >
                        Shipping
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{ p: '0.5rem 1rem' }}
                    >
                        {shippingPrice}
                    </Typography>
                </Grid>
            </Grid>
            {/* <---Tax Price ---> */}
            <Grid container sx={{ borderBottom: '1px solid #ddd' }}>
                <Grid container xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{p: '0.5rem 1rem' }}
                    >
                        Tax
                    </Typography>
                </Grid>
                <Grid container xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{p: '0.5rem 1rem' }}
                    >
                        {taxPrice}
                    </Typography>
                </Grid>
            </Grid>
            {/* <---Total Order Price ---> */}
            <Grid container sx={{ borderBottom: '1px solid #ddd' }}>
                <Grid item xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{p: '0.5rem 1rem' }}
                    >
                        Order Total
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        variant='subtitle1'
                        sx={{ p: '0.5rem 1rem' }}
                    >
                        {totalPrice}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderSummery;