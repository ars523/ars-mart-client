import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie} from 'recharts';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderSummery } from '../features/order/orderSlice'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { HeadingPrimary } from '../shared/typography'
import Loader from '../component/Loader'
import { useTheme } from '@mui/material/styles';
function DashboardScreen() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state)
  useEffect(() => {
    dispatch(getOrderSummery())
  }, [dispatch])

  return (
    <Container>
      <HeadingPrimary variant='h3' sx={{ color: '#333', mb: '2rem' }}>Dashboard</HeadingPrimary>
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
              <ResponsiveContainer width='100%' height={400}>
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
                  <Area
                    fillOpacity={1}
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    fill={theme.palette.primary.light}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>

            <Grid item xs={12}>
            <Typography variant='h5'>Category</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="count"
                    nameKey="_id"
                    isAnimationActive={false}
                    data={order.ordersSummery.productCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill={theme.palette.primary.light}
                    fillOpacity={1}
                    stroke="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </>)
        }
      </Grid>
    </Container>
  )
}

export default DashboardScreen