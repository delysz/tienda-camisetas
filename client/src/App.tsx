import { useEffect, useState } from 'react';

// 1. Definimos la forma que tienen los datos (TypeScript nos ayuda aquí)
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Pedimos los datos a TU servidor (Backend)
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>👕 Tienda de Camisetas Full Stack</h1>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              border: '1px solid #eee',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h2 style={{ fontSize: '1.2rem', margin: '15px 0 10px' }}>{product.name}</h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>${product.price}</span>
                <button
                  onClick={() => {
                    // 1. Enviamos la petición de pago a TU backend
                    fetch('http://localhost:3001/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        productId: product.id, // Enviamos el ID del producto
                        quantity: 1
                      })
                    })
                      .then(res => res.json())
                      .then(data => {
                        // 2. Si todo va bien, el backend nos da una URL de Stripe
                        if (data.url) {
                          window.location.href = data.url; // Redirigimos al usuario a pagar
                        } else {
                          console.error("Error: No recibimos URL de pago");
                        }
                      })
                      .catch(err => console.error("Error al pagar:", err));
                  }}
                  style={{
                    /* ... (tus estilos actuales: background, color, etc.) ... */
                    background: '#3498db', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                  }}>
                  Comprar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;