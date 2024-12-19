import decodeToken from '../utils'
import { ACTION_TYPES } from './actionTypes'

const storeReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        token: payload.token,
        userInfo: decodeToken(payload.token),
      }
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        token: '',
        userInfo: '',
      }
    default:
      return state
  }
}

export default storeReducer
