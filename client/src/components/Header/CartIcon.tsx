import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const CartIcon = () => {
  const { cart } = useCart()

  return (
    <div className="relative">
      <ShoppingCart className="h-7 w-7 text-white" />
      {cart.itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {cart.itemCount}
        </span>
      )}
    </div>
  )
}

export default CartIcon