import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storeContext from '../context/storeContext'

const ProtectDashboard = () => {
  const { store } = useContext(storeContext)

  return store.userInfo ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectDashboard
