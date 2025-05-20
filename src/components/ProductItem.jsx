import React from 'react';
import { Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useTheme } from '@mui/material/styles';

const ProductItem = ({ product }) => {
  const { addItemToCart } = useCart();
  const theme = useTheme();

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <Button
      variant='contained'
      onClick={handleAddToCart}
      sx={{
        width: 120,
        height: 80,
        //margin: 1,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'cemter',
        textAlign: 'center',
        backgroundColor: theme.palette.productCard?.main || theme.palette.primary.main,
        color: theme.palette.productCard?.contrastText || theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.productCard?.dark || theme.palette.primary.dark,
        },
        textTransform: 'none'
      }}
    >
      <Typography variant='subtitle2' component='div' sx={{ lineHeight: 1.2 }} >
        {product.name}
      </Typography>
      <Typography variant='body2' component='div' sx={{ fontWeight: 'bold' }} >
        ${product.price.toFixed(2)}
      </Typography>
    </Button>
  );

};

export default ProductItem;