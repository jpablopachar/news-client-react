import axios from 'axios'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../config/config'
import storeContext from '../../context/storeContext'

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

      dispatch({ type: 'login_success', payload: { token: data.token } })

      navigate('/dashboard')
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
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                value={state.email}
                onChange={inputHandle}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                onChange={inputHandle}
                value={state.password}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              />
            </div>
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
