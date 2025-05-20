import React from 'react';
import { Typography, Box } from '@mui/material';
import { useCart } from '../context/CartContext';
import ProductCategory from './ProductCategory';

const ProductSection = () => {
  
  // Gets all products from context
  const { products } = useCart(); 

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category.toLowerCase(); // Normalize category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Obtener un array de los nombres de las categorías para mantener un orden (opcional, podría ser el orden de aparición)
  // Podrías tener un array predefinido para el orden si es necesario: const categoryOrder = ['tacos', 'bebidas', 'extras'];
  const categories = Object.keys(productsByCategory);

  return(
    <Box sx={{ height: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Menu
      </Typography>
      {
        categories.length > 0 ? 
          (
            categories.map(categoryName => (
              <ProductCategory 
                key={categoryName}
                categoryName={categoryName}
                products={productsByCategory[categoryName]}
              />
            ))
          ) : (
            <Typography>Sin Productos Disponibles</Typography>
          )
      }
    </Box>
  );
};

export default ProductSection;