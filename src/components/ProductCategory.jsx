import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import ProductItem from './ProductItem';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Mapping categories to icons
const categoryIcons = {
  tacos: <LocalDiningIcon sx={{ mr: 1 }} />,
  bebidas: <LocalCafeIcon sx={{ mr: 1 }} />,
  extras: <AddCircleOutlineIcon sx={{ mr: 1 }} />,
};

const ProductCategory = ({ categoryName, products }) => {
  const displayCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const icon = categoryIcons[categoryName.toLowerCase()] || null;

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
        {icon}
        {displayCategoryName}
      </Typography>
      {/* Ajustamos el 'spacing' del container si queremos más/menos espacio entre botones */}
      <Grid container spacing={1.5}> {/* Puedes probar con 1, 1.5, 2 etc. */}
        {products.map(product => (
          <Grid xs={6} sm={4} md={3} key={product.id}> {/* Estas props definen el ancho de la celda */}
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductCategory;