import { motion } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-20 h-20 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Parece que aún no has añadido productos a tu carrito. 
            ¡Descubre nuestra colección exclusiva de camisetas con IA!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-medium"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Explorar Diseños
          </Link>
        </motion.div>
      </div>
    )
  }

  const handleCheckout = () => {
    // Aquí podrías modificar para enviar todos los items del carrito
    // Por ahora, vamos a enviar solo el primer item (para mantener la compatibilidad con tu backend)
    const firstItem = cart.items[0];
    fetch('http://localhost:3001/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: firstItem.id,
        quantity: firstItem.quantity
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.url) {
        window.location.href = data.url;
      }
    })
    .catch(err => console.error("Error al pagar:", err));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Tu Carrito
        </h1>
        <p className="text-gray-600 mb-8">
          {cart.itemCount} {cart.itemCount === 1 ? 'artículo' : 'artículos'} - ${cart.total.toFixed(2)}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {cart.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors mb-4 last:mb-0"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-purple-600">
                        ${item.price.toFixed(2)}
                      </span>
                      
                      <div className="flex items-center border-2 border-gray-200 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}

              {/* Clear Cart Button */}
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={clearCart}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-2xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-bold text-lg mb-4"
              >
                Proceder al pago
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <Link
                to="/"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-purple-600 bg-white rounded-xl hover:bg-purple-50 transition-colors font-medium border-2 border-purple-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CartPage