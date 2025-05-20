// src/App.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import ProductSection from './components/ProductSection'; // Para POS
import InventorySection from './components/InventorySection';
import BillingSection from './components/BillingSection';
import SystemSection from './components/SystemSection';
import ReceiptSection from './components/ReceiptSection';

const EXPANDED_SIDEBAR_WIDTH = '200px';
const COLLAPSED_SIDEBAR_WIDTH = '60px';
const RECEIPT_SECTION_WIDTH = '500px';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeView, setActiveView] = useState('POS'); // Estado para la vista activa, POS por defecto

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Nueva función para cambiar la vista
  const handleViewChange = (viewName) => {
    setActiveView(viewName);
  };

  const currentSidebarWidth = isSidebarExpanded ? EXPANDED_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH;

  // Función para renderizar el componente de la vista activa
  const renderActiveViewComponent = () => {
    switch (activeView) {
      case 'POS':
        return <ProductSection />;
      case 'Inventario':
        return <InventorySection />;
      case 'Facturación':
        return <BillingSection />;
      case 'Sistema':
        return <SystemSection />;
      default:
        return <ProductSection />; // Vista por defecto o de fallback
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Sidebar
        isExpanded={isSidebarExpanded}
        width={currentSidebarWidth}
        onToggle={handleSidebarToggle}
        activeView={activeView} // Pasa la vista activa a Sidebar
        onViewChange={handleViewChange} // Pasa la función para cambiar la vista
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflowY: 'auto',
          marginLeft: currentSidebarWidth,
          marginRight: RECEIPT_SECTION_WIDTH,
          padding: 3,
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {renderActiveViewComponent()} {/* Renderiza el componente activo aquí */}
      </Box>

      <Box
        component="aside"
        sx={{
          width: RECEIPT_SECTION_WIDTH,
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          overflowY: 'hidden',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #ddd',
          zIndex: 1200,
          display: 'flex',
        }}
      >
        <ReceiptSection />
      </Box>
    </Box>
  );
}

export default App;