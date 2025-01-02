import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaImage } from 'react-icons/fa'
import { baseUrl } from '../../config/config'
import storeContext from './../../context/storeContext'

const Profile = () => {
  const { store } = useContext(storeContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    imageUrl: '',
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  })

  const [message, setMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()

    data.append('name', formData.name)
    data.append('email', formData.email)

    if (formData.image) data.append('image', formData.image)

    try {
      const res = await axios.put(
        `${baseUrl}/api/update-profile/${store.userInfo.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      )

      toast.success(res.data.message)

      setFormData((prev) => ({ ...prev, imageUrl: res.data.user.image }))
    } catch {
      setMessage('Failed to update profile')
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    const { oldPassword, newPassword } = passwordData

    if (!oldPassword || !newPassword) {
      setPasswordError('Please fill in both password fields')

      return
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long')

      return
    }

    try {
      await axios.post(
        `${baseUrl}/api/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      )

      toast.success('Password updated successfully')

      setPasswordData({ oldPassword: '', newPassword: '' })
      setPasswordError('')
    } catch (error) {
      toast.error(error.response.data.message)

      setPasswordError('Failed to update password')
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    setFormData((prev) => ({ ...prev, image: event.target.files[0] }))
  }

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target

    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/profile/${store.userInfo.id}`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          }
        )

        const { name, email, image } = res.data.user

        setFormData((prev) => ({ ...prev, name, email, imageUrl: image }))
      } catch {
        setMessage('Failed to load profile data')
      }
    }

    fetchProfile()
  }, [store.userInfo.id, store.token])

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5">
      <div className="bg-white p-6 rounded-lg flex items-center shadow-md">
        <div className="flex-shrink-0">
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Profile"
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          ) : (
            <label
              htmlFor="img"
              className="w-[150px] h-[150px] flex flex-col justify-center items-center rounded-full bg-gray-200 border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-200 transition duration-300"
            >
              <FaImage className="text-4xl" />
              <span className="mt-2">Select Image</span>
            </label>
          )}
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="ml-6 text-gray-700 flex flex-col space-y-2">
          <label htmlFor="name" className="text-md font-medium text-gray-600">
            Name:{' '}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="text-xl font-semibold"
            placeholder="Name"
          />
          <label htmlFor="email" className="text-md font-medium text-gray-600">
            Email:{' '}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="text-xl font-semibold"
            placeholder="Email"
          />
          <p className="text-gray-600 text-xl font-bold">
            Category:{' '}
            <span className="text-gray-600 text-xl font-bold">
              {' '}
              {store.userInfo?.category}
            </span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
        <h2 className="text-lg font-bold text-center mb-5">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="old_password"
                className="block text-md font-semibold text-gray-600"
              >
                Old Password{' '}
              </label>
              <input
                type="password"
                id="old_password"
                name="old_password"
                value={passwordData.oldPassword}
                onChange={handlePasswordInputChange}
                placeholder="Enter Old Passowrd"
                className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="new_password"
                className="block text-md font-semibold text-gray-600"
              >
                New Password{' '}
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                placeholder="Enter New Passowrd"
                value={formData.newPassword}
                onChange={handlePasswordInputChange}
                className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>
          </div>
          {passwordError && <p className="text-center mt-4">{passwordError}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
