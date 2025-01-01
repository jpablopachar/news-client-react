import axios from 'axios'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../config/config'
import { ROUTES } from '../../constants/routes'
import { ACTION_TYPES } from '../../context/actionTypes'
import storeContext from '../../context/storeContext'
import InputField from '../components/InputField'

const Login = () => {
  const navigate = useNavigate()

  const { dispatch } = useContext(storeContext)

  const [loader, setLoader] = useState(false)

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const inputHandle = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post(`${baseUrl}/api/login`, state)

      setLoader(false)

      localStorage.setItem('newsToken', data.token)

      toast.success(data.message)

      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: { token: data.token },
      })

      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      setLoader(false)

      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-[400px]">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img
              className="w-[150px]"
              src="https://i.ibb.co.com/WcB36Jq/mainlogo.png"
              alt="logo"
            />
          </div>
          <form onSubmit={submit} className="space-y-6">
            <InputField
              label="Email"
              labelClass="block text-md font-medium text-gray-700 mb-2"
              inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              type="email"
              name="email"
              value={state.email}
              onChange={inputHandle}
              placeholder="Enter your email"
              required={true}
            />
            <InputField
              label="Password"
              labelClass="block text-md font-medium text-gray-700 mb-2"
              inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              type="password"
              name="password"
              value={state.password}
              onChange={inputHandle}
              placeholder="Enter your password"
              required={true}
            />
            <div>
              <button
                type="submit"
                disabled={loader}
                className={`w-full py-3 text-white rounded-md transition font-semibold ${
                  loader
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-400'
                } `}
              >
                {loader ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
