/* eslint-disable no-unused-vars */

import axios from 'axios'
import JoditEditor from 'jodit-react'
import { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaImages } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
import { baseUrl } from '../../config/config'
import storeContext from '../../context/storeContext'
import Gallery from '../components/Gallery'
import InputField from '../components/InputField'

const EditNews = () => {
  const { store } = useContext(storeContext)

  const { newsId } = useParams()

  const editor = useRef(null)

  const [newsData, setNewsData] = useState({
    title: '',
    description: '',
    newImage: null,
    oldImage: '',
  })

  const [previewImage, setPreviewImage] = useState('')
  const [loader, setLoader] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [images, setImages] = useState([])
  const [imagesLoader, setImagesLoader] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setNewsData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setPreviewImage(URL.createObjectURL(file))
      setNewsData((prev) => ({ ...prev, newImage: file }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('title', newsData.title)
    formData.append('description', newsData.description)
    formData.append('newImage', newsData.newImage)
    formData.append('oldImage', newsData.oldImage)

    try {
      setLoader(true)

      const { data } = await axios.put(
        `${baseUrl}/api/news/update/${newsId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update news.')
    } finally {
      setLoader(false)
    }
  }

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/images`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })

      setImages(data.images)
    } catch {
      toast.error('Failed to fetch images.')
    }
  }

  const fetchNewsDetails = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/edit/news/${newsId}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })

      setNewsData({
        title: data.news.title,
        description: data.news.description,
        oldImage: data.news.image,
        newImage: null,
      })

      setPreviewImage(data.news.image)
    } catch {
      toast.error('Failed to fetch news details.')
    }
  }

  const handleMultipleFileUpload = async (event) => {
    const files = event.target.files
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    try {
      setImagesLoader(true)

      const { data } = await axios.post(`${baseUrl}/api/images/add`, formData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })

      setImages((prev) => [...prev, ...data.images])

      toast.success(data.message)
    } catch {
      toast.error('Failed to upload images.')
    } finally {
      setImagesLoader(false)
    }
  }

  useEffect(() => {
    fetchNewsDetails()
    fetchImages()
  }, [newsId])

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Edit News</h2>
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-300"
          to="/dashboard/news"
        >
          View All
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Title"
          labelClass="block text-md font-medium text-gray-600 mb-2"
          inputClass="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 outline-none transition h-10"
          type="text"
          name="title"
          value={newsData.title}
          onChange={handleInputChange}
          placeholder="Enter News Title"
          required={true}
        />
        <div>
          <label
            htmlFor="img"
            className="w-full h-[240px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-500 rounded-lg text-gray-500 hover:border-blue-500 transition mt-4"
          >
            {previewImage ? (
              <img src={previewImage} className="w-full h-full" alt="Preview" />
            ) : (
              <div className="flex justify-center items-center flex-col gap-y-2">
                <FaImages className="text-4xl mb-2" />
                <span className="font-medium">Select Image</span>
              </div>
            )}
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            className="hidden"
            id="img"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2 mt-4">
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-600"
            >
              Description{' '}
            </label>
            <div
              onClick={() => setShowGallery(true)}
              className="text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              <FaImages className="text-2xl" />
            </div>
          </div>
          <JoditEditor
            ref={editor}
            value={newsData.description}
            tabIndex={1}
            onBlur={(value) =>
              setNewsData((prev) => ({ ...prev, description: value }))
            }
            onChange={() => {}}
            className="w-full border border-gray-400 rounded-md"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={loader}
            className="px-3 py-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-800"
          >
            {loader ? 'Loading...' : 'Update News'}
          </button>
        </div>
      </form>
      {showGallery && <Gallery setShow={setShowGallery} images={images} />}
      <input
        onChange={handleMultipleFileUpload}
        type="file"
        multiple
        id="images"
        className="hidden"
      />
    </div>
  )
}

export default EditNews
