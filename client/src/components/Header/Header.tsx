import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartIcon from './CartIcon'

const Header = () => {
  const {  } = useCart()

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <ShoppingBag className="h-10 w-10 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">🔥 StyleShirt</h1>
              <p className="text-sm text-purple-200">Diseños IA Exclusivos</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-purple-200 font-medium">
              Inicio
            </Link>
            <Link to="/cart" className="relative">
              <CartIcon />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header