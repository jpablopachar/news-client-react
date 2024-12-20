import { useContext } from 'react'
import { BiNews } from 'react-icons/bi'
import { FaHouseUser } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import { IoShareOutline } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { PiUsersFill } from 'react-icons/pi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROLES } from '../../constants/roles'
import { ROUTES } from '../../constants/routes'
import { ACTION_TYPES } from '../../context/actionTypes'
import storeContext from '../../context/storeContext'

const Sidebar = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const { store, dispatch } = useContext(storeContext)

  const logout = () => {
    localStorage.removeItem('newsToken')

    dispatch({ type: ACTION_TYPES.LOGOUT, payload: '' })

    navigate(ROUTES.LOGIN)
  }
  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-[#dadaff]">
      <div className="h-[70px] flex justify-center items-center">
        <Link to="/">
          <img
            className="w-[190px] h-[35px]"
            src="https://i.ibb.co.com/WcB36Jq/mainlogo.png"
            alt=""
          />
        </Link>
      </div>
      <ul className="px-3 flex flex-col gap-y-1 font-medium">
        {store.userInfo.role === ROLES.ADMIN ? (
          <>
            <li>
              <Link
                to={ROUTES.DASHBOARD_ADMIN}
                className={`px-3 ${
                  pathname === ROUTES.DASHBOARD_ADMIN
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-[#404040f6]'
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
              >
                <span className="text-[18px]">
                  <MdDashboard />
                </span>
                <span className="text-[18px]">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.DASHBOARD_WRITER_ADD}
                className={`px-3 ${
                  pathname === ROUTES.DASHBOARD_WRITER_ADD
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-[#404040f6]'
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
              >
                <span className="text-[18px]">
                  <MdDashboard />
                </span>
                <span className="text-[18px]">Add Writer</span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.DASHBOARD_WRITERS}
                className={`px-3 ${
                  pathname === ROUTES.DASHBOARD_WRITERS
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-[#404040f6]'
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
              >
                <span className="text-[18px]">
                  <PiUsersFill />
                </span>
                <span className="text-[18px]">Writers</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={ROUTES.DASHBOARD_WRITER}
                className={`px-3 ${
                  pathname === ROUTES.DASHBOARD_WRITER
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-[#404040f6]'
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
              >
                <span className="text-[18px]">
                  <MdDashboard />
                </span>
                <span className="text-[18px]">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.DASHBOARD_NEWS_CREATE}
                className={`px-3 ${
                  pathname === ROUTES.DASHBOARD_NEWS_CREATE
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-[#404040f6]'
                } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
              >
                <span className="text-[18px]">
                  <IoMdAdd />
                </span>
                <span className="text-[18px]">Add News</span>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            to={ROUTES.DASHBOARD_NEWS}
            className={`px-3 ${
              pathname === ROUTES.DASHBOARD_NEWS
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-[#404040f6]'
            } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
          >
            <span className="text-[18px]">
              <BiNews />
            </span>
            <span className="text-[18px]">News</span>
          </Link>
        </li>
        <li>
          <Link
            to={ROUTES.DASHBOARD_PROFILE}
            className={`px-3 ${
              pathname === ROUTES.DASHBOARD_PROFILE
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-[#404040f6]'
            } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
          >
            <span className="text-[18px]">
              <FaHouseUser />
            </span>
            <span className="text-[18px]">Profile</span>
          </Link>
        </li>
        <li>
          <div
            onClick={logout}
            className={`px-3 bg-white text-[#404040f6] py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white `}
          >
            <span className="text-[18px]">
              <IoShareOutline />
            </span>
            <span className="text-[18px]">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
