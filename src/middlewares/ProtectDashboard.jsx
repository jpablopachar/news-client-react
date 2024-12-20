import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import storeContext from '../context/storeContext'

const ProtectDashboard = () => {
  const { store } = useContext(storeContext)

  return store.userInfo ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />
}

export default ProtectDashboard
