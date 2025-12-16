import { motion } from 'framer-motion'
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
            >
              <CheckCircle className="w-12 h-12" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">¡Pago Exitoso!</h1>
            <p className="text-lg opacity-90">Tu pedido ha sido confirmado</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-6">
                Gracias por tu compra. Hemos enviado un correo de confirmación con todos los detalles.
              </p>
              
              {/* Order Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="flex items-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Detalles del Pedido
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número de pedido:</span>
                    <span className="font-bold">#{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-semibold">{new Date().toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-semibold text-emerald-600">✅ Procesado</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  📦 ¿Qué sigue?
                </h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Recibirás un email de confirmación en minutos</li>
                  <li>• El pedido será enviado en 24-48 horas</li>
                  <li>• Recibirás un email con el número de seguimiento</li>
                  <li>• Tiempo estimado de entrega: 3-5 días hábiles</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Seguir Comprando
                </Link>
                
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 border border-blue-200"
                >
                  Ver Carrito
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Success