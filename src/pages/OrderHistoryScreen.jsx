import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Order from '../component/Order'
import Error from '../component/Error'
import { getOrderHistory} from '../features/order/orderSlice'
function OrderHistoryScreen() {
  const {ordersHistory, isLoading, isError, error} = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderHistory())
  }, [dispatch])

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
    <>
      <Order orderData={ordersHistory} page='orderHistory'/>
    </>
  )
}

export default OrderHistoryScreen