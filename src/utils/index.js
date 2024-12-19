import { jwtDecode } from 'jwt-decode'

const decodeToken = (token) => {
  if (!token) return ''

  try {
    const decodedToken = jwtDecode(token)
    const isExpired = new Date() > new Date(decodedToken.exp * 1000)

    if (isExpired) {
      localStorage.removeItem('newsToken')

      return ''
    }

    return decodedToken
  } catch {
    return ''
  }
}

export default decodeToken
