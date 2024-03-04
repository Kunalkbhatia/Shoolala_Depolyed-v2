import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const ProtectedRoute = ({isAuthenticated , isAdmin}) => {
  const {user} = useSelector((state) => state.user);
  if(isAuthenticated === false){
    return <Navigate to="/login"/>
  }
  if(isAdmin === true && user.role !== "admin"){
    return <Navigate to="/login"/>
  }

  return <Outlet/>
}

export default ProtectedRoute
