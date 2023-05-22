import { Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Steapper from '../component/OrderStepper';
import { saveShippingAddress } from '../features/cart/cartSlice';
import { ButtonPrimary } from '../shared/button';
import { HeadingPrimary } from '../shared/typography';
import LayoutPrimary from '../layouts/LayoutPrimary';

const ShippingAddressScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { fullName, address, city, postalCode, country } = useSelector(state => state.cart.shippingAddress)
    const [shippingAddress, setShippingAddress] = useState({
        fullName: fullName || '',
        address: address || '',
        city: city || '',
        postalCode: postalCode || '',
        country: country || '',
    })

    const handleInputChange = (e) => {
        const newShippingAddress = { ...shippingAddress }
        newShippingAddress[e.target.name] = e.target.value
        setShippingAddress(newShippingAddress)
    }

    const handleShippingAddressSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress(shippingAddress))
        navigate('/payment')
    }

    return (
        <LayoutPrimary>
            <Grid container direction='column' spacing={'2rem'}>
                <Grid item> {/* <--- Stepper ---> */}
                    <Container>
                        <Steapper activeStep={1}></Steapper>
                    </Container>
                </Grid>
                <Grid item> {/* <--- Shipping address form ---> */}
                    <Container component={'form'} onSubmit={handleShippingAddressSubmit}>
                        <Grid container direction='column' spacing={3}>
                            <Grid item>
                                <HeadingPrimary variant='h5'>Shipping Address</HeadingPrimary>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder='Full Name'
                                    onChange={handleInputChange}
                                    name='fullName'
                                    value={shippingAddress.fullName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder='Address'
                                    onChange={handleInputChange}
                                    name='address'
                                    value={shippingAddress.address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder='City'
                                    onChange={handleInputChange}
                                    name='city'
                                    value={shippingAddress.city}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder='Postal Code'
                                    onChange={handleInputChange}
                                    name='postalCode'
                                    value={shippingAddress.postalCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder='Country'
                                    onChange={handleInputChange}
                                    name='country'
                                    value={shippingAddress.country}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonPrimary variant='contained' type='submit'>
                                    Continue
                                </ButtonPrimary>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid />
            </Grid>
        </LayoutPrimary>

    );
};

export default ShippingAddressScreen;