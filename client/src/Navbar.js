import { useState, MouseEvent, useEffect, lazy, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import ViewImage from "./components/Hooks/ViewImage";
import { UserContext } from "./UserContext";
import { Divider } from "@mui/material";
import MediaService from "./services/media.services";


const Navbar = ({logout}) => {
  const { user, settings } = useContext(UserContext);
    console.log("🚀 ~ file: Navbar.js:24 ~ Navbar ~ user:", user)
    
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if(user?.avatar){
        MediaService.loadImage(user.avatar).then((res)=>{
            setProfilePic(URL.createObjectURL(res.data));
        });
    }
    }, [user]);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action='') => {
    setAnchorElUser(null);
    if(action === 'logout'){
        logout();
    }
  };

  return (
    <AppBar position="static" className="themeBg" component="nav">
      <Container  >
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', display: "flex" }}>
            {settings?.logo && <ViewImage image={settings.logo} sx={{ maxHeight: 50, maxWidth: 120, display: { xs: "none", md: "flex" } }} />}
           
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={(e)=>setAnchorElNav(e.currentTarget)} color="inherit" >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{   vertical: "bottom",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{   display: { xs: "block", md: "none" }, }} >
                <MenuItem key={`home`} onClick={handleCloseNavMenu}>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                        Lendarat
                    </Link>
                </MenuItem>
                {user?.username === 'dev' && <MenuItem key={`script`} onClick={handleCloseNavMenu}>
                    <Link to={`/script`} style={{ textDecoration: 'none' }}>
                        Script
                    </Link>
                </MenuItem>}
                <MenuItem key={`introduction`} onClick={handleCloseNavMenu}>
                    <Link to={`/introduction`} style={{ textDecoration: 'none' }}>
                        Pengenalan
                    </Link>
                </MenuItem>
                <MenuItem key={`member_profiles`} onClick={handleCloseNavMenu}>
                    <Link to={`/member_profiles`} style={{ textDecoration: 'none' }}>
                        Profil
                    </Link>
                </MenuItem>
                <MenuItem key={`publication`} onClick={handleCloseNavMenu}>
                    <Link to={`/publication`} style={{ textDecoration: 'none' }}>
                        Penerbitan
                    </Link>
                </MenuItem>
                <MenuItem key={`activity`} onClick={handleCloseNavMenu}>
                    <Link to={`/activity`} style={{ textDecoration: 'none' }}>
                        Aktiviti
                    </Link>
                </MenuItem>
                <MenuItem key={`product`} onClick={handleCloseNavMenu}>
                    <Link to={`/product`} style={{ textDecoration: 'none' }}>
                        Produk
                    </Link>
                </MenuItem>
                <MenuItem key={`contact`} onClick={handleCloseNavMenu}>
                    <Link to={`/contact`} style={{ textDecoration: 'none' }}>
                        Hubungi kami
                    </Link>
                </MenuItem>
              
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", mr:2 }}>
                {user?.username === 'dev' && <Link to={`/script`} style={{ textDecoration: 'none' }}>
                    <Button key={`script`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Script
                    </Button>
                </Link>}
                <Link to={`/introduction`} style={{ textDecoration: 'none' }}>
                    <Button key={`introduction`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Pengenalan
                    </Button>
                </Link>
                <Link to={`/member_profiles`} style={{ textDecoration: 'none' }}>
                    <Button key={`member_profiles`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Profil
                    </Button>
                </Link>
                    <Link to={`/activity`} style={{ textDecoration: 'none' }}>
                        <Button key={`activity`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                            Aktiviti
                        </Button>
                    </Link>
                <Link to={`/publication`} style={{ textDecoration: 'none' }}>
                    <Button key={`publication`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Penerbitan
                    </Button>
                </Link>
                <Link to={`/product`} style={{ textDecoration: 'none' }}>
                    <Button key={`product`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Produk
                    </Button>
                </Link>
                <Link to={`/contact`} style={{ textDecoration: 'none' }}>
                    <Button key={`contact`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Hubungi kami
                    </Button>
                </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e)=>setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profilePic}  />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElUser)} onClose={()=>handleCloseUserMenu()} >
            {user? (<>
                <MenuItem key={"profile"}>
                    <Link to={`/profile`} style={{ textDecoration: 'none' }} onClick={()=>handleCloseUserMenu()}>
                        <Typography textAlign="center">{"My profil"}</Typography>
                    </Link>
                </MenuItem>
                <MenuItem key={"Settings"}>
                    <Link to={`/settings`} style={{ textDecoration: 'none' }} onClick={()=>handleCloseUserMenu()}>
                        <Typography textAlign="center">{"Settings"}</Typography>
                    </Link>
                </MenuItem>
                {/* horizontal line */}
                <Divider />
                <MenuItem key={"Logout"}>
                    <Link to={`/`} style={{ textDecoration: 'none' }} onClick={()=>handleCloseUserMenu('logout')}>
                        <Typography textAlign="center">{"Logout"}</Typography>
                    </Link>
                </MenuItem>
            </>):
            <MenuItem key={"Signin"}>
                <Link to={`/signin`} style={{ textDecoration: 'none' }} onClick={()=>handleCloseUserMenu()}>
                    <Typography textAlign="center">{"Sign in"}</Typography>
                </Link>
            </MenuItem>}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
