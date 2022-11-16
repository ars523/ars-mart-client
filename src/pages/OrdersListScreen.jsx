import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Order from '../component/Order'
import Error from '../component/Error'
import { getAllOrders } from '../features/order/orderSlice'

function OrdersList() {
  const dispatch = useDispatch()
  const { orders, isLoading, isError, error } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }
  else if (isError) {
    return <Error message={error} />
  }
  else if (orders.length === 0) {
    return <Error message='No order found'/>
  }
  return (
    <>
      <Order orderData={orders} page='orders' />
    </>
  )
}

export default OrdersList