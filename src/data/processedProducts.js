// src/data/processedProducts.js
import { v4 as uuidv4 } from 'uuid';
import rawProducts from './products.json';

const IVA_RATE = 0.16; // 16% IVA

const processedProducts = rawProducts.map(product => {
  const priceWithIVA = product.costCents / 100;
  // Calcular el precio base (sin IVA)
  const basePrice = priceWithIVA / (1 + IVA_RATE);

  return {
    ...product,
    id: uuidv4(),
    price: priceWithIVA,       // Precio con IVA (para mostrar en botones y por item en recibo)
    basePrice: basePrice,      // Precio base (sin IVA, para cálculos de subtotal)
    category: product.category.toLowerCase()
  };
});

export default processedProducts;