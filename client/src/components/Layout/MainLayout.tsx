import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} StyleShirt. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Camisetas con diseños únicos generados por IA
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout