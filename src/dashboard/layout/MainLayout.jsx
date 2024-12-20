import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const MainLayout = () => {
  return (
    <div className="min-w-screen min-h-screen bg-slate-400">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100vw-268px)] min-h-[100vh]">
        <Header />
        <div className="p-4">
          <div className="pt-[85px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
