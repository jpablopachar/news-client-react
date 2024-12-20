import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import storeContext from '../context/storeContext'

const ProtectRole = ({ role }) => {
  const { store } = useContext(storeContext)

  return store.userInfo?.role === role ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.DASHBOARD_UNABLE_ACCESS} />
  )
}

export default ProtectRole

ProtectRole.propTypes = { role: PropTypes.string.isRequired }
