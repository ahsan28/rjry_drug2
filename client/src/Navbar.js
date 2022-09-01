import { useState, MouseEvent, useEffect } from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import UserService from "./services/user.services";

const Navbar = ({currentUser=null, logout}) => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', display: "flex" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" } }} />
            <Typography variant="h6" as="span" color="white" sx={{ mr: "25px", pb: "5px" }} >
                Self Manage
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{   vertical: "bottom",   horizontal: "left", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "left", }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{   display: { xs: "block", md: "none" }, }} >
                {/* <MenuItem key={`users`} onClick={handleCloseNavMenu}>
                    <Link to={`/users`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Users
                    </Link>
                </MenuItem> */}
                <MenuItem key={`introduction`} onClick={handleCloseNavMenu}>
                    <Link to={`/introduction`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Pengenalan
                    </Link>
                </MenuItem>
                <MenuItem key={`research`} onClick={handleCloseNavMenu}>
                    <Link to={`/research`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Penyelidikan
                    </Link>
                </MenuItem>
                <MenuItem key={`publications`} onClick={handleCloseNavMenu}>
                    <Link to={`/publications`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Penerbitan
                    </Link>
                </MenuItem>
                <MenuItem key={`mode`} onClick={handleCloseNavMenu}>
                    <Link to={`/mode`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Modul
                    </Link>
                </MenuItem>
                <MenuItem key={`activities`} onClick={handleCloseNavMenu}>
                    <Link to={`/activities`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Aktiviti
                    </Link>
                </MenuItem>
                <MenuItem key={`certifications`} onClick={handleCloseNavMenu}>
                    <Link to={`/certifications`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Pensijilan
                    </Link>
                </MenuItem>
                <MenuItem key={`gallery`} onClick={handleCloseNavMenu}>
                    <Link to={`/gallery`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Galeri
                    </Link>
                </MenuItem>
                <MenuItem key={`contact`} onClick={handleCloseNavMenu}>
                    <Link to={`/contact`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Hubungi kami
                    </Link>
                </MenuItem>
              
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* <Link to={`/users`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`users`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Users
                    </Button>
                </Link> */}
                <Link to={`/introduction`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`introduction`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Pengenalan
                    </Button>
                </Link>
                <Link to={`/research`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`research`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Penyelidikan
                    </Button>
                </Link>
                <Link to={`/publications`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`publications`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Penerbitan
                    </Button>
                </Link>
                <Link to={`/mode`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`mode`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Modul
                    </Button>
                </Link>
                <Link to={`/activities`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`activities`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Aktiviti
                    </Button>
                </Link>
                <Link to={`/certifications`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`certifications`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Pensijilan
                    </Button>
                </Link>
                <Link to={`/gallery`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`gallery`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Galeri
                    </Button>
                </Link>
                <Link to={`/contact`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`contact`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Hubungi kami
                    </Button>
                </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElUser)} onClose={()=>handleCloseUserMenu()} >
                {currentUser? <MenuItem key={"Logout"}>
                    <Link to={`/logout`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseUserMenu()}>
                        <Typography textAlign="center">{"Logout"}</Typography>
                    </Link>
                </MenuItem>:
                <MenuItem key={"Signin"}>
                    <Link to={`/signin`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseUserMenu()}>
                        <Typography textAlign="center">{"Sign in"}</Typography>
                    </Link>
                </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
