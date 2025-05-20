// src/components/SystemSection.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SystemSection() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sistema
      </Typography>
      <Typography variant="body1">
        Aquí se mostrarán las configuraciones y opciones del sistema.
      </Typography>
      {/* TODO: Implementar contenido de Sistema */}
    </Box>
  );
}

export default SystemSection;