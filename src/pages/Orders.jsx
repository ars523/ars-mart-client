import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Order from '../component/Order'
import { getAllOrders } from '../features/order/orderSlice'

function Orders() {
    const dispatch = useDispatch()
    const {orders} = useSelector(state=>state.order)
    
    useEffect(()=>{
     dispatch(getAllOrders())
    }, [dispatch])

  return (
    <>
      <Order orderData = {orders} page='orders'/>
    </>
  )
}

export default Orders