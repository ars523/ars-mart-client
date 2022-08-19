import { Grid, Paper, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OrderSummery from '../component/OrderSummery'
import { getOrderById, reset } from '../features/order/orderSlice'
import { LinkPrimary } from '../shared/link'
import { HeadingPrimary } from '../shared/typography'

function Orders() {
  const dispatch = useDispatch()
  const { orderId } = useParams()
  const { shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice } = useSelector(state => state.order.order)
  
  useEffect(()=>{
    return ()=>{
      dispatch(reset())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId, dispatch])
  return (
    <Container>
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid item xs={12}>
          <HeadingPrimary variant='h3'>Order {orderId}</HeadingPrimary>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* <---Shipping Details---> */}
            <Paper variant='outlined' sx={{ p: '1.5rem' }}>
              <Typography variant='h5' sx={{ mb: '12px', fontWeight: '500' }}>Shipping</Typography>
              <Typography variant='h6' sx={{ fontWeight: '400' }}>
                <span style={{ fontWeight: '500' }}>Name:</span> {shippingAddress?.fullName}
              </Typography>
              <Typography variant='h6' sx={{ mb: '12px', fontWeight: '400' }}>
                <span style={{ fontWeight: '500' }}>Address:</span>  {shippingAddress?.address}
              </Typography>
              <Paper elevation={0} sx={{ bgcolor: '#ffcdd2', p: '16px' }}>
                <Typography sx={{ color: '#b71c1c' }}>Not Delevered</Typography>
              </Paper>
            </Paper>
            {/* <---Payment Status */}
            <Paper variant='outlined' sx={{ p: '1.5rem' }}>
              <Typography variant='h5' sx={{ mb: '12px', fontWeight: '500' }}>Payment</Typography>
              <Typography variant='h6' sx={{ mb: '12px', fontWeight: '400' }}>
                <span style={{ fontWeight: '500' }}>Method:</span> {paymentMethod}
              </Typography>
              <Paper elevation={0} sx={{ bgcolor: '#ffcdd2', p: '16px' }}>
                <Typography sx={{ color: '#b71c1c' }}>Not Paind</Typography>
              </Paper>
            </Paper>
            {/* <---Orders Items--->*/}
            <Paper variant='outlined' sx={{ p: '1.5rem' }}>
              <Typography variant='h5' sx={{ fontWeight: '500', mb: '8px' }}>Items</Typography>
              <Stack spacing={2} sx={{ pl: '16px' }}>
                {
                  orderItems?.map(cart => (
                    <Grid key={cart._id} container alignItems='center'>
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
              </Stack>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant='outlined' sx={{ p: '1rem' }}>
            <OrderSummery
              itemsPriece={itemsPrice}
              totalPrice={totalPrice}
              taxPrice={taxPrice}
              shippingPrice={shippingPrice}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Orders