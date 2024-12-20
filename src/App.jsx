import { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROLES } from './constants/roles'
import { ROUTES } from './constants/routes'
import storeContext from './context/storeContext'
import MainLayout from './dashboard/layout/MainLayout'
import Login from './dashboard/pages/Login'
import Unable from './dashboard/pages/Unable'
import ProtectDashboard from './middlewares/ProtectDashboard'

function App() {
  const {
    LOGIN,
    DASHBOARD,
    DASHBOARD_ADMIN,
    DASHBOARD_WRITER,
    DASHBOARD_UNABLE_ACCESS,
  } = ROUTES

  const { store } = useContext(storeContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={DASHBOARD} element={<ProtectDashboard />} />
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
          <Route path={DASHBOARD_UNABLE_ACCESS} element={<Unable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
