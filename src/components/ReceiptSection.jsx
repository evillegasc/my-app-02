// src/components/ReceiptSection.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useCart } from '../context/CartContext';
import ReceiptItem from './ReceiptItem';

// Define el orden deseado para las categorías en el recibo
const CATEGORY_ORDER = ['tacos', 'bebidas', 'extras'];

const ReceiptSection = () => {
  const { cartItems, getCartSubtotal, getCartTaxes, getCartTotal, clearCart } = useCart();

  // 1. Agrupar los items del carrito por categoría
  const groupedCartItems = React.useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const category = item.category.toLowerCase(); // Usar minúsculas para consistencia
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, [cartItems]); // Recalcular solo si cartItems cambia

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert(`Pago simulado exitoso. Total: $${getCartTotal().toFixed(2)}. El carrito se limpiará.`);
    clearCart();
  };

  const subtotal = getCartSubtotal();
  const taxes = getCartTaxes();
  const total = getCartTotal();

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
        Recibo
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, border: '1px solid #eee', borderRadius: 1 }}>
        {cartItems.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', p: 3 }}>
            No hay artículos agregados aún.
          </Typography>
        ) : (
          // 2. Renderizar los items agrupados y en orden
          CATEGORY_ORDER.map(categoryKey => {
            const itemsInCategory = groupedCartItems[categoryKey];
            if (itemsInCategory && itemsInCategory.length > 0) {
              return (
                <Box key={categoryKey} sx={{ mb: 2 }}> {/* Contenedor para cada grupo de categoría */}
                  <Typography
                    variant="subtitle1"
                    component="div" // Evita warning de anidación de p dentro de p si se usa con gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      p: 1,
                      backgroundColor: 'grey.100', // Un fondo ligero para el encabezado
                      borderBottom: '1px solid #ddd',
                      mt: categoryKey !== CATEGORY_ORDER[0] ? 1 : 0, // Margen superior excepto para la primera categoría
                    }}
                  >
                    {categoryKey}
                  </Typography>
                  {itemsInCategory.map(item => (
                    <ReceiptItem key={item.id} item={item} />
                  ))}
                </Box>
              );
            }
            return null; // No renderizar nada si no hay items de esta categoría en el carrito
          })
        )}
      </Box>

      {/* Sección de Resumen de Costos (Subtotal, IVA, Total) - sin cambios */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body1">IVA (16%):</Typography>
          <Typography variant="body1">${taxes.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Pagar
        </Button>
      </Box>
    </Paper>
  );
};

export default ReceiptSection;