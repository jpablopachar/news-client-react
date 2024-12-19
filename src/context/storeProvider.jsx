import PropTypes from 'prop-types'
import { useMemo, useReducer } from 'react'
import decodeToken from '../utils'
import storeContext from './storeContext'
import storeReducer from './storeReducer'

const initializeState = () => {
  const token = localStorage.getItem('newsToken') || ''
  const userInfo = decodeToken(token)

  return { token, userInfo }
}

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, null, initializeState)

  const contextValue = useMemo(() => ({ store, dispatch }), [store])

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  )
}

export default StoreProvider

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
