import { Box, Typography } from "@mui/material";

const NoPage = () => {


    return (<Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
      404
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Page not found
      </Typography>
    </Box>)
  
  };
  
  export default NoPage;