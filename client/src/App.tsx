import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './components/Layout/MainLayout'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>
      </Routes>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
    </>
  )
}

export default App