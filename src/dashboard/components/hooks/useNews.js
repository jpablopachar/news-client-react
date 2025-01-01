import axios from 'axios'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { baseUrl } from '../../../config/config'

export const useNews = (token) => {
  const [news, setNews] = useState([])
  const [allNews, setAllNews] = useState([])
  const [res, setRes] = useState({ id: '', loader: false })

  const fetchNews = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setAllNews(data.news)
      setNews(data.news)
    } catch {
      toast.error('Failed to fetch news')
    }
  }, [token])

  const handleDeleteNews = async (newsId) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        const { data } = await axios.delete(
          `${baseUrl}/api/news/delete/${newsId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        toast.success(data.message)

        fetchNews()
      } catch {
        toast.error('Failed to delete news')
      }
    }
  }

  const handleUpdateStatus = async (status, news_id) => {
    try {
      setRes({ id: news_id, loader: true })

      const { data } = await axios.put(
        `${baseUrl}/api/news/status-update/${news_id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(data.message)

      fetchNews()
    } catch {
      toast.error('Failed to update status')
    } finally {
      setRes({ id: '', loader: false })
    }
  }

  return {
    news,
    allNews,
    res,
    fetchNews,
    handleDeleteNews,
    handleUpdateStatus,
    setNews,
  }
}
