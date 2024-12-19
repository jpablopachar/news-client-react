import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import StoreProvider from './context/storeProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <>
      <App />
      <Toaster />
    </>
  </StoreProvider>
)
