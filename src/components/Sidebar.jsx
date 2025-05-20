// src/components/Sidebar.jsx
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';

// Define los ítems del menú con sus identificadores y texto para el estado
const menuItemsConfig = [
  { id: 'POS', text: 'POS', icon: <PointOfSaleIcon /> },
  { id: 'Inventario', text: 'Inventario', icon: <InventoryIcon /> },
  { id: 'Facturación', text: 'Facturación', icon: <ReceiptLongIcon /> },
  { id: 'Sistema', text: 'Sistema', icon: <SettingsIcon /> },
];

function Sidebar({ isExpanded, width, onToggle, activeView, onViewChange }) {
  return (
    <Box
      component="aside"
      sx={{
        width: width,
        backgroundColor: '#f8f9fa',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        borderRight: '1px solid #dee2e6',
        boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
        zIndex: 100,
        overflowX: 'hidden',
        transition: 'width 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isExpanded ? 'flex-end' : 'center',
          alignItems: 'center',
          padding: '8px',
          borderBottom: isExpanded ? '1px solid #e0e0e0' : 'none',
        }}
      >
        <IconButton onClick={onToggle} color="primary" aria-label="toggle sidebar">
          {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <List component="nav" sx={{ paddingTop: isExpanded ? 1 : 2 }}>
        {menuItemsConfig.map((item) => (
          <ListItemButton
            key={item.id}
            selected={activeView === item.id} // Usa el id para 'selected'
            onClick={() => onViewChange(item.id)} // Llama a onViewChange con el id del ítem
            title={isExpanded ? '' : item.text}
            sx={{
              paddingLeft: isExpanded ? 2 : 'auto',
              justifyContent: isExpanded ? 'initial' : 'center',
              marginBottom: '4px',
              // Estilos para el ítem seleccionado (MUI maneja algunos con 'selected')
              ...(activeView === item.id && { // Estilos adicionales para el activo
                backgroundColor: 'rgba(0, 123, 255, 0.08)', // Un fondo más sutil para activo
                borderLeft: `3px solid #007bff`,
                paddingLeft: isExpanded ? 'calc(16px - 3px)' : 'auto', // Ajusta si tienes paddingLeft=2 (16px)
                '& .MuiListItemIcon-root': {
                  color: '#007bff',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: '600', // Un poco más de peso
                  color: '#007bff',
                }
              }),
              '&:hover': {
                backgroundColor: '#e9ecef',
                // No es necesario color aquí si ListItemIcon y ListItemText lo manejan
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#007bff',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isExpanded ? 2 : 'auto',
                justifyContent: 'center',
                color: activeView === item.id ? '#007bff' : '#5f6368',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {isExpanded && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    color: activeView === item.id ? '#007bff' : '#3c4043',
                    fontWeight: activeView === item.id ? '600' : 500,
                    fontSize: '0.9rem'
                  }
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;