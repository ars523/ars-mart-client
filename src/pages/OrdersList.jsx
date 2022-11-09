import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Order from '../component/Order'
import { getAllOrders } from '../features/order/orderSlice'

function OrdersList() {
  const dispatch = useDispatch()
  const { orders, isLoading } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])
  return (
    <>
      {
        isLoading
        ?(<Loader/>):(
          <Order orderData={orders} page='orders'/>
        )
      }

    </>
  )
}

export default OrdersList