import React from 'react';
import '../../App.css'
import { Box } from '@mui/material';

function ComponentLoader() {
  return (<Box sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.35)' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div className="cloader"></div>
      <div className="cloader2"></div>
    </Box>
  </Box>
  );
}

export default ComponentLoader;