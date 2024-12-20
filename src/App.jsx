import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import Login from './dashboard/pages/Login'
import ProtectDashboard from './middlewares/ProtectDashboard'

function App() {
  const { LOGIN, DASHBOARD } = ROUTES

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={DASHBOARD} element={<ProtectDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
