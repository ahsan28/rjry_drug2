import { Box, Button, Container, Divider, Typography } from "@mui/material";
import UserService from "../../services/user.services";

const Script = () => {




return (<>
  <Box className="themeCBF" sx={{ height: '72px' }} />
  <Box className="stripTheme" sx={{ width: "100%", textAlign: 'center', p: 2, position: "relative" }}>
    <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
      {"Developer Script"}
    </Typography>
  </Box>
  <Container>
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h1" gutterBottom>
      Dev Script
      </Typography>

  <Box sx={{ width: '100%', textAlign: 'center', bgcolor: "lightblue", color: "white", p: 2, position: "relative" , m:3 }}>
    <Divider />
      <Typography variant="subtitle1" gutterBottom>
        Do not click the bitton below if you are not a developer, it may break the website, and whole database.
      </Typography>
    <Divider />
  </Box>
      <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "15rem", py:10 }}
          onClick={()=>{
            if(window.confirm("Are you sure you want to execute the script?")) UserService.devScript();
          }}>
            Execute Script
      </Button>
    </Box>
</Container>
</>)
  
  };
  
  export default Script;