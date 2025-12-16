import { useEffect, useState } from 'react'
import ProductCard from '../components/Product/ProductCard'
import type { Product } from '../context/CartContext'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            🎨 Diseños Únicos con IA
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Camisetas personalizadas creadas por inteligencia artificial. 
            Cada diseño es exclusivo y nunca se repetirá.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-xl text-gray-600">Cargando diseños espectaculares...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Colección Exclusiva
              </h2>
              <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full font-medium">
                {products.length} diseños disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir nuestros diseños?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">IA Avanzada</h3>
              <p className="text-gray-600">Diseños únicos generados por algoritmos de última generación</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">👕</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Calidad Premium</h3>
              <p className="text-gray-600">Camisetas 100% algodón con estampados de alta durabilidad</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Envío Rápido</h3>
              <p className="text-gray-600">Recibe tu pedido en 3-5 días hábiles en toda la región</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home