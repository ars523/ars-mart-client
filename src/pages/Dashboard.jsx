import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderSummery } from '../features/order/orderSlice'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { HeadingPrimary } from '../shared/typography'
import { Chart } from "react-google-charts";
import Loader from '../component/Loader'
function Dashboard() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state)
  useEffect(() => {
    dispatch(getOrderSummery())
  }, [dispatch])
  return (
    <Container>
      <HeadingPrimary variant='h3' sx={{ color: '#333', mb:'2rem' }}>Dashboard</HeadingPrimary>
      <Grid container columnSpacing={4} rowSpacing={9}>
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

            <Grid item xs={12}>
              <Typography variant='h5'>Sales</Typography>
              <ResponsiveContainer  width='100%' height={400}>
              <AreaChart
                data={order.ordersSummery.dailyOrders}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#f0c040" />
              </AreaChart>
              </ResponsiveContainer>
            </Grid>
          </>)
        }
      </Grid>
    </Container>
  )
}

export default Dashboard