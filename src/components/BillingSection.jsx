// src/components/BillingSection.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function BillingSection() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Facturación
      </Typography>
      <Typography variant="body1">
        Aquí se mostrarán las opciones de facturación.
      </Typography>
      {/* TODO: Implementar contenido de Facturación */}
    </Box>
  );
}

export default BillingSection;