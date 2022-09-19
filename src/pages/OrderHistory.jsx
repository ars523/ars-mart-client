import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Order from '../component/Order'
import { getOrderHistory, reset } from '../features/order/orderSlice'
function OrderHistory() {
  const {ordersHistory, isSuccess} = useSelector(state => state.order)
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      if(isSuccess){
        dispatch(reset())
      }
    }
  }, [isSuccess, dispatch])
  useEffect(() => {
    dispatch(getOrderHistory())
  }, [dispatch])

  return (
    <>
      <Order orderData={ordersHistory} page='orderHistory'/>
    </>
  )
}

export default OrderHistory