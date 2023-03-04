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


const Navbar = ({currentUser=null, logout}) => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElActiviti, setAnchorElActiviti] = useState(null);
  const [anchorElPener, setAnchorElPener] = useState(null);
  const [anchorElProduk, setAnchorElProduk] = useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action='') => {
    setAnchorElUser(null);
    if(action === 'logout'){
        logout();
        }
  };
  const handleCloseActivitiMenu = () => {
    setAnchorElActiviti(null);
  };
  const handleClosePenerMenu = () => {
    setAnchorElPener(null);
  };
  const handleCloseProdukMenu = () => {
    setAnchorElProduk(null);
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
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={(e)=>setAnchorElNav(e.currentTarget)} color="inherit" >
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
                <MenuItem key={`profile`} onClick={handleCloseNavMenu}>
                    <Link to={`/profile`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                        Profile
                    </Link>
                </MenuItem>
                {/* <MenuItem key={`research`} onClick={handleCloseNavMenu}>
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
                </MenuItem> */}
                <MenuItem key={`activity`} onClick={(e)=>setAnchorElActiviti(e.currentTarget)}>
                        Aktiviti
                </MenuItem>
                <MenuItem key={`publications`} onClick={(e)=>setAnchorElPener(e.currentTarget)}>
                        Penerbitan
                </MenuItem>
                <MenuItem key={`product`} onClick={(e)=>setAnchorElProduk(e.currentTarget)}>
                        Produk
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
                <Link to={`/profile`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`profile`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Profile
                    </Button>
                </Link>
                {/* <Link to={`/research`} style={{ textDecoration: 'none', color: 'MenuText' }}>
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
                </Link> */}
                <Button key={`activity`} onClick={(e)=>setAnchorElActiviti(e.currentTarget)} sx={{ my: 2, color: "white", display: "block" }} >
                    Aktiviti
                </Button>
                <Button key={`publications`} onClick={(e)=>setAnchorElPener(e.currentTarget)} sx={{ my: 2, color: "white", display: "block" }} >
                    Penerbitan
                </Button>
                <Button key={`product`} onClick={(e)=>setAnchorElProduk(e.currentTarget)} sx={{ my: 2, color: "white", display: "block" }} >
                    Produk
                </Button>
                <Link to={`/contact`} style={{ textDecoration: 'none', color: 'MenuText' }}>
                    <Button key={`contact`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Hubungi kami
                    </Button>
                </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e)=>setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElUser)} onClose={()=>handleCloseUserMenu()} >
                {currentUser? <MenuItem key={"Logout"}>
                    <Link to={`/`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseUserMenu('logout')}>
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
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElActiviti} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElActiviti)} onClose={()=>handleCloseActivitiMenu()} >
            <MenuItem key={"mesyuarat"}>
                <Link to={`/mesyuarat`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Mesyuarat"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"bengkel"}>
                <Link to={`/bengkel`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Bengkel"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"latihan"}>
                <Link to={`/latihan`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Latihan & konsultasi"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"pengumpulan"}>
                <Link to={`/pengumpulan`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Pengumpulan"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"kolaborasi"}>
                <Link to={`/kolaborasi`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Kolaborasi"}</Typography>
                </Link>
            </MenuItem>
          </Menu>
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElPener} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElPener)} onClose={()=>handleClosePenerMenu()} >
            <MenuItem key={"buku"}>
                <Link to={`/buku`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Buku"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"artikel"}>
                <Link to={`/artikel`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Artikel"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"akhbar"}>
                <Link to={`/akhbar`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Akhbar"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"module"}>
                <Link to={`/module`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Module"}</Typography>
                </Link>
            </MenuItem>
          </Menu>
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElProduk} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElProduk)} onClose={()=>handleCloseProdukMenu()} >
            <MenuItem key={"kerangka"}>
                <Link to={`/kerangka`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseProdukMenu()}>
                    <Typography textAlign="center">{"Kerangka Sekolah Bebas Dadah"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"rubrik"}>
                <Link to={`/rubrik`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseProdukMenu()}>
                    <Typography textAlign="center">{"Rubrik Efikasi dan Kompetensi Guru dalam PPDa dalam Bilik Darjah"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"modul"}>
                <Link to={`/modul`} style={{ textDecoration: 'none', color: 'MenuText' }} onClick={()=>handleCloseProdukMenu()}>
                    <Typography textAlign="center">{"Modul Digital Sekolah Bebas Dadah"}</Typography>
                </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
