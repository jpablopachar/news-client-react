import { convert } from 'html-to-text'
import { useContext, useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { NEWS_STATUS } from '../../constants/options'
import storeContext from '../../context/storeContext'
import SelectField from './SelectField'
import { useNews } from './hooks/useNews'

const { PENDING, ACTIVE, DEACTIVE } = NEWS_STATUS

const options = [PENDING, ACTIVE, DEACTIVE]
const newsOptions = ['5', '10', '15', '20']

const NewsContent = () => {
  const { store } = useContext(storeContext)
  const {
    news,
    allNews,
    res,
    fetchNews,
    handleDeleteNews,
    handleUpdateStatus,
    setNews,
  } = useNews(store.token)

  const [parPage, setParPage] = useState(5)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  useEffect(() => {
    if (news.length > 0) {
      setPages(Math.ceil(news.length / parPage))
    }
  }, [news, parPage])

  const handleSearchNews = (event) => {
    const query = event.target.value.toLowerCase()

    setNews(allNews.filter((n) => n.title.toLowerCase().includes(query)))
    setPage(1)
  }

  const handleFilterByStatus = (event) => {
    const status = event.target.value

    setNews(status ? allNews.filter((n) => n.status === status) : allNews)
    setPage(1)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex items-center gap-4 mb-6">
        <select
          onChange={handleFilterByStatus}
          name="status"
          className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--- Select Status ---</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          onChange={handleSearchNews}
          type="text"
          placeholder="Search News"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-4 px-6 text-left">No</th>
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Category</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {news.length > 0 &&
              news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <tr key={i} className="border-t">
                  <td className="py-4 px-6">{i + 1}</td>
                  <td className="py-4 px-6">{n.title.slice(0, 15)}...</td>
                  <td className="py-4 px-6">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={n.image}
                      alt="news"
                    />
                  </td>
                  <td className="py-4 px-6">{n.category}</td>
                  <td className="py-4 px-6">
                    {convert(n.description).slice(0, 15)}...
                  </td>
                  <td className="py-4 px-6">{n.date}</td>
                  {store?.userInfo?.role === 'admin' ? (
                    <td className="py-4 px-6">
                      {n.status === 'pending' && (
                        <span
                          onClick={() => handleUpdateStatus('active', n._id)}
                          className="px-2 py-[2px] bg-blue-200 text-blue-800 rounded-md text-xs cursor-pointer"
                        >
                          {res.loader && res.id === n._id
                            ? 'Loading..'
                            : n.status}
                        </span>
                      )}
                      {n.status === 'active' && (
                        <span
                          onClick={() => handleUpdateStatus('deactive', n._id)}
                          className="px-2 py-[2px] bg-green-200 text-green-800 rounded-md text-xs cursor-pointer"
                        >
                          {res.loader && res.id === n._id
                            ? 'Loading..'
                            : n.status}
                        </span>
                      )}
                      {n.status === 'deactive' && (
                        <span
                          onClick={() => handleUpdateStatus('active', n._id)}
                          className="px-2 py-[2px] bg-red-200 text-red-800 rounded-md text-xs cursor-pointer"
                        >
                          {res.loader && res.id === n._id
                            ? 'Loading..'
                            : n.status}
                        </span>
                      )}
                    </td>
                  ) : (
                    <td className="py-4 px-6">
                      {n.status === 'pending' && (
                        <span className="px-2 py-[2px] bg-blue-200 text-blue-800 rounded-md text-xs">
                          {n.status}
                        </span>
                      )}
                      {n.status === 'active' && (
                        <span className="px-2 py-[2px] bg-green-200 text-green-800 rounded-md text-xs">
                          {n.status}
                        </span>
                      )}
                      {n.status === 'deactive' && (
                        <span className="px-2 py-[2px] bg-red-200 text-red-800 rounded-md text-xs">
                          {n.status}
                        </span>
                      )}
                    </td>
                  )}
                  <td className="py-4 px-6">
                    <div className="flex gap-3 text-gray-500">
                      <Link
                        to="#"
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                      >
                        <FaEye />
                      </Link>
                      {store?.userInfo?.role === 'writer' && (
                        <>
                          <Link
                            to={`/dashboard/news/edit/${n._id}`}
                            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-800"
                          >
                            <FaEdit />
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteNews(n._id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center py-6">
        <SelectField
          containerClass="flex items-center gap-4"
          label="News Per Page"
          labelClass="text-sm font-semibold"
          selectClass="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          name="category"
          value={parPage}
          onChange={(e) => {
            setParPage(parseInt(e.target.value))
            setPage(1)
          }}
          options={newsOptions}
          required={false}
          defaultValue={false}
        />
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-bold">
            {' '}
            {(page - 1) * parPage + 1}/{news.length} - {pages}{' '}
          </span>
          <div className="flex gap-2">
            <IoIosArrowBack
              onClick={() => {
                if (page > 1) setPage(page - 1)
              }}
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800"
            />
            <IoIosArrowForward
              onClick={() => {
                if (page < pages) setPage(page + 1)
              }}
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsContent
