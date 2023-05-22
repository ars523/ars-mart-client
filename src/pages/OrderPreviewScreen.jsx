import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import OrderStepper from '../component/OrderStepper'
import { HeadingPrimary } from '../shared/typography'
import { useDispatch, useSelector } from 'react-redux'
import { LinkPrimary } from '../shared/link'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom'
import { ButtonPrimary } from '../shared/button'
import { resertCarts } from '../features/cart/cartSlice'
import { orderProduct } from '../features/order/orderSlice'
import OrderSummery from '../component/OrderSummery'
import { toast } from 'react-toastify'
import LayoutPrimary from '../layouts/LayoutPrimary'

function OrderPreviewScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const { shippingAddress, paymentMethod, carts } = useSelector(state => state.cart)
    const { fullName, address } = shippingAddress

    const itemsPriece = carts.reduce((a, i) => a + (i.price * i.quantity), 0);
    const shippingPrice = itemsPriece > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPriece;
    const totalPrice = itemsPriece + shippingPrice + taxPrice

    const handlePlaceOrder = () => {
        dispatch(orderProduct({
            orderItems: carts,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: itemsPriece,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }))
            .unwrap()
            .then((order) => {
                dispatch(resertCarts())
                navigate('/order/' + order._id)
                toast.success('Ordered succesfully')
            })
            .catch((error) => toast.error(error))
    }

    return (
        <LayoutPrimary>
            <Container>
                <Grid container direction='column' spacing={'2rem'}>
                    {/* <---Stepper---> */}
                    <Grid item>
                        <OrderStepper activeStep={3} />
                    </Grid>
                    {/* <---Preview order container --->*/}
                    <Grid item container gap={'1rem'}>
                        <Grid item>
                            <HeadingPrimary variant='h5'>
                                Preview Order
                            </HeadingPrimary>
                        </Grid>
                        <Grid item container spacing={'1rem'}>
                            {/*<---Shipping Payment Order details--> */}
                            <Grid container item direction={'column'} xs={12} md={8} gap={'1rem'}>
                                <Grid item>
                                    <Paper variant='outlined' sx={{ p: '1.5rem' }}>
                                        <Typography variant='h6' sx={{ mb: '12px', fontWeight: '500' }}>Shipping</Typography>
                                        <Typography variant='subtitle1' sx={{ fontWeight: '400' }}>
                                            <span style={{ fontWeight: '500' }}>Name:</span> {fullName}
                                        </Typography>
                                        <Typography variant='subtitle1' sx={{ mb: '12px', fontWeight: '400' }}>
                                            <span style={{ fontWeight: '500' }}>Address:</span>  {address}
                                        </Typography>
                                        <LinkPrimary to='/shipping'>
                                            <Typography variant='subtitle1'>
                                                Edit
                                            </Typography>
                                        </LinkPrimary>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper variant='outlined' sx={{ p: '1.5rem' }}>
                                        <Typography variant='h6' sx={{ mb: '12px', fontWeight: '500' }}>Payment</Typography>
                                        <Typography variant='subtitle1' sx={{ mb: '12px', fontWeight: '400' }}>
                                            <span style={{ fontWeight: '500' }}>Method:</span> {paymentMethod}
                                        </Typography>
                                        <LinkPrimary to='/payment'>
                                            <Typography variant='subtitle1'>
                                                Edit
                                            </Typography>
                                        </LinkPrimary>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper variant='outlined' sx={{ p: '1.5rem' }}>
                                        <Typography variant='h6' sx={{ fontWeight: '500' }}>Items</Typography>
                                        <Grid container rowSpacing={2} sx={{ p: '16px' }}>
                                            {
                                                carts.map(cart => (
                                                    <Grid key={cart._id} item container alignItems='center'>
                                                        <Grid item xs={12} md={4}>
                                                            <Stack direction='row' alignItems='center' columnGap='4px'>
                                                                <Paper
                                                                    sx={{ width: '50px', p: '4px' }}
                                                                    variant='outlined'>
                                                                    <img
                                                                        src={cart.image}
                                                                        alt={cart.name}
                                                                        style={{ width: '100%' }}
                                                                    />
                                                                </Paper>
                                                                <LinkPrimary to={`/product/${cart.slug}`}>
                                                                    <Typography variant='subtitle1'>
                                                                        {cart.name}
                                                                    </Typography>
                                                                </LinkPrimary>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant='subtitle1'>{cart.quantity}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant='subtitle1'>${cart.price}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                        <LinkPrimary to='/carts'>
                                            <Typography variant='subtitle1'>
                                                Edit
                                            </Typography>
                                        </LinkPrimary>
                                    </Paper>
                                </Grid>
                            </Grid>
                            {/* <--- Order summery --->*/}
                            <Grid item xs={12} md={4}>
                                <Paper variant='outlined' sx={{ p: '1rem' }}>
                                    <OrderSummery
                                        itemsPriece={itemsPriece}
                                        totalPrice={totalPrice}
                                        taxPrice={taxPrice}
                                        shippingPrice={shippingPrice}
                                    />
                                    <Box sx={{ p: '0.5rem 0' }}>
                                        <ButtonPrimary
                                            variant='contained'
                                            fullWidth
                                            onClick={handlePlaceOrder}
                                        >
                                            Place Order
                                        </ButtonPrimary>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </LayoutPrimary>
    )
}

export default OrderPreviewScreen