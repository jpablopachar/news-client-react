import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROLES } from './constants/roles'
import { ROUTES } from './constants/routes'
import storeContext from './context/storeContext'
import MainLayout from './dashboard/layout/MainLayout'
import AddWriter from './dashboard/pages/AddWriter'
import AdminIndex from './dashboard/pages/AdminIndex'
import CreateNews from './dashboard/pages/CreateNews'
import EditNews from './dashboard/pages/EditNews'
import EditWriter from './dashboard/pages/EditWriter'
import Login from './dashboard/pages/Login'
import News from './dashboard/pages/News'
import Profile from './dashboard/pages/Profile'
import Unable from './dashboard/pages/Unable'
import WriterIndex from './dashboard/pages/WriterIndex'
import Writers from './dashboard/pages/Writers'
import ProtectDashboard from './middlewares/ProtectDashboard'
import ProtectRole from './middlewares/ProtectRole'

function App() {
  const {
    LOGIN,
    DASHBOARD,
    DASHBOARD_ADMIN,
    DASHBOARD_WRITER,
    UNABLE_ACCESS,
    PROFILE,
    NEWS,
    ADMIN,
    WRITER_ADD,
    WRITERS,
    WRITER_EDIT,
    WRITER,
    NEWS_CREATE,
    NEWS_EDIT,
  } = ROUTES

  const { store } = useContext(storeContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={DASHBOARD} element={<ProtectDashboard />}>
          <Route path="" element={<MainLayout />}>
            <Route
              path=""
              element={
                store.userInfo.role === ROLES.ADMIN ? (
                  <Navigate to={DASHBOARD_ADMIN} />
                ) : (
                  <Navigate to={DASHBOARD_WRITER} />
                )
              }
            />
            <Route path={UNABLE_ACCESS} element={<Unable />} />
            <Route path={PROFILE} element={<Profile />} />
            <Route path={NEWS} element={<News />} />
            <Route path="" element={<ProtectRole role={ROLES.ADMIN} />}>
              <Route path={ADMIN} element={<AdminIndex />} />
              <Route path={WRITER_ADD} element={<AddWriter />} />
              <Route path={WRITERS} element={<Writers />} />
              <Route path={WRITER_EDIT} element={<EditWriter />} />
            </Route>
            <Route path="" element={<ProtectRole role={ROLES.WRITER} />}>
              <Route path={WRITER} element={<WriterIndex />} />
              <Route path={NEWS_CREATE} element={<CreateNews />} />
              <Route path={NEWS_EDIT} element={<EditNews />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
