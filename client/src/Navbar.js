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

const pages = ["User List", "User", "Create User"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  console.log("Navbar.js");

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
                Habib
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{   vertical: "bottom",   horizontal: "left", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "left", }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{   display: { xs: "block", md: "none" }, }} >
                <MenuItem key={`users`} onClick={handleCloseNavMenu}>
                    <Link to={`/users`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Users
                    </Link>
                </MenuItem>
                <MenuItem key={`properties`} onClick={handleCloseNavMenu}>
                    <Link to={`/properties`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Properties
                    </Link>
                </MenuItem>
                <MenuItem key={`contracts`} onClick={handleCloseNavMenu}>
                    <Link to={`/contracts`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Contracts
                    </Link>
                </MenuItem>
                <MenuItem key={`entries`} onClick={handleCloseNavMenu}>
                    <Link to={`/entries`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Entries
                    </Link>
                </MenuItem>
              
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to={`/users`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`users`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Users
                    </Button>
                </Link>
                <Link to={`/properties`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`properties`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Properties
                    </Button>
                </Link>
                <Link to={`/contracts`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`contracts`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Contracts
                    </Button>
                </Link>
                <Link to={`/entries`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`entries`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Entries
                    </Button>
                </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;