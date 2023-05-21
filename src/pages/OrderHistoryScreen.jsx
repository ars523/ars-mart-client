import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Error from '../component/Error'
import { getOrderHistory} from '../features/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { HeadingPrimary } from '../shared/typography'
import TablePrimary from '../component/TablePrimary'
function OrderHistoryScreen() {
  const {ordersHistory, isLoading, isError, error} = useSelector(state => state.order)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrderHistory())
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
    }
  ]

  if(isLoading){
    return <Loader/>
  }
  else if(isError){
    return <Error message={error}/>
  }
  else if(ordersHistory.length===0){
    return <Error message='No order found'/>
  }
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <HeadingPrimary variant='h5' sx={{ color: 'grey.900' }}>
            Order History
          </HeadingPrimary>
        </Grid>
        <Grid item xs={12}>
          <TablePrimary data={ordersHistory} columns={columns} actions={actions} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default OrderHistoryScreen