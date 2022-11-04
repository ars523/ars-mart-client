import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOrderSummery } from '../features/order/orderSlice'

function Dashboard() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getOrderSummery())
  }, [dispatch])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard