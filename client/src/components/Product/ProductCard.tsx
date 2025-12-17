import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import type { Product } from '../../context/CartContext'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1
    })
  }

  const handleBuyNow = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        quantity: 1
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-red-500" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          ¡Nuevo!
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 truncate">{product.name}</h3>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">{product.description}</p>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Añadir
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-4 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Comprar Ahora
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard