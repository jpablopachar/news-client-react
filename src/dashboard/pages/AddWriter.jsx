import axios from 'axios'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../../config/config'
import { WRITER_CATEGORIES } from '../../constants/categories'
import { ROUTES } from '../../constants/routes'
import storeContext from '../../context/storeContext'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'

const {
  EDUCATION,
  TRAVEL,
  HEALTH,
  INTERNATIONAL,
  SPORTS,
  TECHNOLOGY,
  BUSINESS,
} = WRITER_CATEGORIES

const categories = [
  EDUCATION,
  TRAVEL,
  HEALTH,
  INTERNATIONAL,
  SPORTS,
  TECHNOLOGY,
  BUSINESS,
]

const AddWriter = () => {
  const { store } = useContext(storeContext)

  const navigate = useNavigate()

  const [loader, setLoader] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoader(true)

    try {
      const { data } = await axios.post(`${baseUrl}/api/writer/add`, formData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })

      toast.success(data.message)

      navigate(ROUTES.DASHBOARD_WRITERS)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoader(false)
    }
  }
  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-semibold">Add Writers</h2>
        <Link
          className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
          to="/dashboard/writers"
        >
          Writers
        </Link>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <InputField
              containerClass="flex flex-col gap-y-2"
              label="Name"
              labelClass="text-md font-semibold text-gray-600"
              inputClass="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required={true}
            />
            <SelectField
              containerClass="flex flex-col gap-y-2"
              label="Category"
              labelClass="text-md font-semibold text-gray-600"
              selectClass="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <InputField
              containerClass="flex flex-col gap-y-2"
              label="Email"
              labelClass="text-md font-semibold text-gray-600"
              inputClass="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required={true}
            />
            <InputField
              containerClass="flex flex-col gap-y-2"
              label="Password"
              labelClass="text-md font-semibold text-gray-600"
              inputClass="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-blue-500 h-10"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required={true}
            />
          </div>
          <div className="mt-4">
            <button
              disabled={loader}
              className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
            >
              {loader ? 'Loading...' : 'Add Writer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddWriter
