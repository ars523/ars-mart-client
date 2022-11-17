import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Error from '../component/Error'
import { deleteOrderByAdmin, getAllOrders } from '../features/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import TablePrimary from '../component/TablePrimary'
import { Container, Grid } from '@mui/material'
import { HeadingPrimary } from '../shared/typography'

function OrdersList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, isLoading, isError, error } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Date', value: 'createdAt' },
    { heading: 'Total', value: 'totalPrice' },
    { heading: 'Paid', value: 'isPaid' },
    { heading: 'Delivered', value: 'isDelivered' },
    { heading: 'Actions', value: 'actions' }
  ]

  const actions = [
    {
      name: 'Details',
      value: 'details',
      onclick: (id) => {
        navigate(`/order/${id}`)
      }
    },
    {
      name: 'Delete',
      value: 'delete',
      onclick: (id) => {
        dispatch(deleteOrderByAdmin(id))
      }
    }
  ]

  if (isLoading) {
    return <Loader />
  }
  else if (isError) {
    return <Error message={error} />
  }
  else if (orders.length === 0) {
    return <Error message='No order found' />
  }
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <HeadingPrimary variant='h4' sx={{ color: 'grey.900' }}>
            Orders
          </HeadingPrimary>
        </Grid>
        <Grid item xs={12}>
          <TablePrimary data={orders} columns={columns} actions={actions} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default OrdersList