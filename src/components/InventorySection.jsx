// src/components/InventorySection.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function InventorySection() {
  return (
    <Box sx={{ p: 3 }}> {/* Un poco de padding */}
      <Typography variant="h4" component="h1" gutterBottom>
        Inventario
      </Typography>
      <Typography variant="body1">
        Aquí se mostrará la gestión de inventario.
      </Typography>
      {/* TODO: Implementar contenido de Inventario */}
    </Box>
  );
}

export default InventorySection;