import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
            >
              <XCircle className="w-12 h-12" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Pago Cancelado</h1>
            <p className="text-lg opacity-90">No se ha realizado ningún cargo</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-6">
                El proceso de pago ha sido cancelado. Puedes intentarlo de nuevo o modificar tu carrito.
              </p>

              {/* Possible Reasons */}
              <div className="bg-red-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-900 mb-3">
                  🤔 ¿Por qué podría haberse cancelado?
                </h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Decidiste cancelar el pago voluntariamente</li>
                  <li>• Problemas temporales con el procesador de pagos</li>
                  <li>• Información de tarjeta incorrecta o expirada</li>
                  <li>• Fondos insuficientes en la cuenta</li>
                </ul>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  🔄 ¿Quieres intentarlo de nuevo?
                </h3>
                <p className="text-gray-700 mb-4">
                  Tus artículos siguen en el carrito. Puedes:
                </p>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Verificar la información de pago</li>
                  <li>• Intentar con otro método de pago</li>
                  <li>• Contactar con soporte si el problema persiste</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300 hover:shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Volver al Carrito
                </Link>
                
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Seguir Comprando
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-2">
                  ¿Necesitas ayuda con el pago?
                </p>
                <a 
                  href="mailto:soporte@tienda-camisetas.com" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  soporte@tienda-camisetas.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Cancel