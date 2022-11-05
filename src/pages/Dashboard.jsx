import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderSummery } from '../features/order/orderSlice'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { HeadingPrimary } from '../shared/typography'
import { Chart } from "react-google-charts";
import Loader from '../component/Loader'
function Dashboard() {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state)
  useEffect(() => {
    dispatch(getOrderSummery())
  }, [dispatch])

  return (
    <Container>
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <HeadingPrimary variant='h3' sx={{ color: '#333' }}>Dashboard</HeadingPrimary>
        </Grid>
        {order.isLoading ? <Loader /> :
          (<>
            <Grid item md={4}>
              <Paper variant='outlined' sx={{ p: '1rem' }}>
                <Typography variant='h6' sx={{ color: '#333' }}>
                  {order.ordersSummery.users && order.ordersSummery.users[0].numUsers}
                </Typography>
                <Typography variant='h6' sx={{ color: '#333' }}>Users</Typography>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper variant='outlined' sx={{ p: '1rem' }}>
                <Typography variant='h6' sx={{ color: '#333' }}>
                  {order.ordersSummery.users && order.ordersSummery.orders[0].numOrders}
                </Typography>
                <Typography variant='h6' sx={{ color: '#333' }}>Orders</Typography>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper variant='outlined' sx={{ p: '1rem' }}>
                <Typography variant='h6' sx={{ color: '#333' }}>
                  ${order.ordersSummery.users && order.ordersSummery.orders[0].totalSales}
                </Typography>
                <Typography variant='h6' sx={{ color: '#333' }}>Orders</Typography>
              </Paper>
            </Grid>

            {/* <Grid item xs={12}>
              <Typography variant='h5'>Sales</Typography>
              {
                order.ordersSummery.dailyOrders?.length ===0?(
                  <p>No sales</p>
                ):(<Chart
                  chartType="AreaChart"
                  loader={<p>Loading...</p>}
                  data={[["Date", "Sales"], 
                  ...order.ordersSummery?.dailyOrders?.map((x)=>[x._id, x.sales])
                  ]}
                  width="100%"
                  height="400px"
                  legendToggle
                />)
              }
            </Grid> */}
          </>)
        }
      </Grid>
    </Container>
  )
}

export default Dashboard