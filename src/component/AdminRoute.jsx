import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function AdminRoute() {
    const {pathname} = useLocation()
    const {isLoggedIn, admin, user} = useAuth()
  return (
    (isLoggedIn || user) && admin ? <Outlet/> : <Navigate to='/login' state={{from: pathname}}/>
  )
}

export default AdminRoute