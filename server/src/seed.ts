import { prisma } from './prisma';

async function main() {
  const camiseta = await prisma.product.create({
    data: {
      name: 'Camiseta Developer',
      description: '100% Algodón, ideal para programar en TypeScript.',
      price: 25.99,
      image: 'https://via.placeholder.com/300', // Imagen falsa por ahora
      stock: 10
    }
  });
  console.log('✅ Camiseta creada:', camiseta);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());