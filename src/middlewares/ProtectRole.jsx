import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storeContext from '../context/storeContext'

const ProtectRole = ({ role }) => {
  const { store } = useContext(storeContext)

  return store.userInfo?.role === role ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard/unable-access" />
  )
}

export default ProtectRole

ProtectRole.propTypes = { role: PropTypes.string.isRequired }
