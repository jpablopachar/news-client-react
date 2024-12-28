import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ROLES } from '../../constants/roles'
import { ROUTES } from '../../constants/routes'
import storeContext from '../../context/storeContext'
import NewsContent from '../components/NewsContent'

const News = () => {
  const { store } = useContext(storeContext)

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium"> News</h2>
        {store.userInfo.role !== ROLES.ADMIN && (
          <Link
            className="px-4 py-[8px] bg-blue-500 rounded-lg text-white hover:bg-blue-800"
            to={ROUTES.DASHBOARD_NEWS_CREATE}
          >
            {' '}
            Create News
          </Link>
        )}
      </div>
      <NewsContent />
    </div>
  )
}

export default News
