import React from 'react';
import '../../App.css'
import { Box } from '@mui/material';

function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.35)' }}>
      <div className="loader"></div>
      <div className="loader2"></div>
    </Box>
  );
}

export default Loader;