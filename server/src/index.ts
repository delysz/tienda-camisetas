import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma';
import Stripe from 'stripe'; // NUEVO: Importamos Stripe

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// NUEVO: Inicializamos Stripe con la clave del archivo .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-11-17.clover', // Usa la versión que te sugiera VS Code si es distinta
});

app.use(cors());
app.use(express.json());

// --- RUTAS ---

app.get('/', (req: Request, res: Response) => {
  res.send('¡API Tienda Camisetas funcionando! 👕');
});

app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// NUEVO: Ruta para iniciar el proceso de pago
app.post('/api/checkout', async (req: Request, res: Response) => {
  try {
    // 1. Recibimos el ID del producto que quiere comprar y la cantidad
    const { productId, quantity = 1 } = req.body;

    // 2. Buscamos el producto REAL en la base de datos (¡Seguridad ante todo!)
    // No nos fiamos del precio que envíe el frontend.
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 3. Creamos la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // O 'eur' para euros
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.image], // Stripe mostrará la imagen
            },
            unit_amount: Math.round(product.price * 100), // Stripe trabaja en céntimos (25.99 -> 2599)
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      // A dónde redirigir si paga bien o si cancela (URL del frontend)
      success_url: 'http://localhost:5173/success', 
      cancel_url: 'http://localhost:5173/cancel',
    });

    // 4. Devolvemos la URL de pago al frontend
    res.json({ url: session.url });

  } catch (error) {
    console.error('Error en Stripe:', error);
    res.status(500).json({ error: 'Error al crear la sesión de pago' });
  }
});

// ... (Rutas de crear producto si las tenías, etc.)

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});