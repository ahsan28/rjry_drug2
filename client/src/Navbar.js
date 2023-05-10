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

// const ViewImage = lazy(() => import("./components/Pages/ViewImage"));

const Navbar = ({logout}) => {
  const { user, settings } = useContext(UserContext);
    console.log("🚀 ~ file: Navbar.js:24 ~ Navbar ~ user:", user)
    
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElActiviti, setAnchorElActiviti] = useState(null);
  const [anchorElPener, setAnchorElPener] = useState(null);
  const [anchorElProduk, setAnchorElProduk] = useState(null);
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
    <AppBar position="static" className="themeBg" component="nav">
      <Container  >
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', display: "flex" }}>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" } }} /> */}
            {settings?.logo && <ViewImage image={settings.logo} sx={{ maxHeight: 50, maxWidth: 120, display: { xs: "none", md: "flex" } }} />}
           
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={(e)=>setAnchorElNav(e.currentTarget)} color="inherit" >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{   vertical: "bottom",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{   display: { xs: "block", md: "none" }, }} >
                {/* <MenuItem key={`users`} onClick={handleCloseNavMenu}>
                    <Link to={`/users`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Users
                    </Link>
                </MenuItem> */}
                <MenuItem key={`introduction`} onClick={handleCloseNavMenu}>
                    <Link to={`/introduction`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Pengenalan
                    </Link>
                </MenuItem>
                <MenuItem key={`member_profiles`} onClick={handleCloseNavMenu}>
                    <Link to={`/member_profiles`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Profils
                    </Link>
                </MenuItem>
                {/* <MenuItem key={`research`} onClick={handleCloseNavMenu}>
                    <Link to={`/research`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Penyelidikan
                    </Link>
                </MenuItem>
                <MenuItem key={`publications`} onClick={handleCloseNavMenu}>
                    <Link to={`/publications`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Penerbitan
                    </Link>
                </MenuItem>
                <MenuItem key={`mode`} onClick={handleCloseNavMenu}>
                    <Link to={`/mode`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Modul
                    </Link>
                </MenuItem>
                <MenuItem key={`activities`} onClick={handleCloseNavMenu}>
                    <Link to={`/activities`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Aktiviti
                    </Link>
                </MenuItem>
                <MenuItem key={`certifications`} onClick={handleCloseNavMenu}>
                    <Link to={`/certifications`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Pensijilan
                    </Link>
                </MenuItem>
                <MenuItem key={`gallery`} onClick={handleCloseNavMenu}>
                    <Link to={`/gallery`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
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
                    <Link to={`/contact`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                        Hubungi kami
                    </Link>
                </MenuItem>
              
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", mr:2 }}>
                {/* <Link to={`/users`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`users`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Users
                    </Button>
                </Link> */}
                <Link to={`/introduction`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`introduction`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Pengenalan
                    </Button>
                </Link>
                <Link to={`/member_profiles`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`member_profiles`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Profils
                    </Button>
                </Link>
                {/* <Link to={`/research`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`research`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Penyelidikan
                    </Button>
                </Link>
                <Link to={`/publications`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`publications`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Penerbitan
                    </Button>
                </Link>
                <Link to={`/mode`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`mode`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Modul
                    </Button>
                </Link>
                <Link to={`/activities`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`activities`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Aktiviti
                    </Button>
                </Link>
                <Link to={`/certifications`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
                    <Button key={`certifications`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }} >
                        Pensijilan
                    </Button>
                </Link>
                <Link to={`/gallery`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
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
                <Link to={`/contact`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }}>
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
                    <Link to={`/profile`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseUserMenu()}>
                        <Typography textAlign="center">{"My profil"}</Typography>
                    </Link>
                </MenuItem>
                <MenuItem key={"Settings"}>
                    <Link to={`/settings`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseUserMenu()}>
                        <Typography textAlign="center">{"Settings"}</Typography>
                    </Link>
                </MenuItem>
                {/* horizontal line */}
                <Divider />
                <MenuItem key={"Logout"}>
                    <Link to={`/`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseUserMenu('logout')}>
                        <Typography textAlign="center">{"Logout"}</Typography>
                    </Link>
                </MenuItem>
            </>):
            <MenuItem key={"Signin"}>
                <Link to={`/signin`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseUserMenu()}>
                    <Typography textAlign="center">{"Sign in"}</Typography>
                </Link>
            </MenuItem>}
          </Menu>
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElActiviti} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElActiviti)} onClose={()=>handleCloseActivitiMenu()} >
            <MenuItem key={"mesyuarat"}>
                <Link to={`/activity/mesyuarat`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Mesyuarat"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"bengkel"}>
                <Link to={`/activity/bengkel`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Bengkel"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"latihan"}>
                <Link to={`/activity/latihan`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Latihan & konsultasi"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"pengumpulan"}>
                <Link to={`/activity/pengumpulan`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Pengumpulan"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"kolaborasi"}>
                <Link to={`/activity/kolaborasi`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseActivitiMenu()}>
                    <Typography textAlign="center">{"Kolaborasi"}</Typography>
                </Link>
            </MenuItem>
          </Menu>
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElPener} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElPener)} onClose={()=>handleClosePenerMenu()} >
            <MenuItem key={"buku"}>
                <Link to={`/buku`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Buku"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"artikel"}>
                <Link to={`/artikel`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Artikel"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"akhbar"}>
                <Link to={`/akhbar`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Akhbar"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"module"}>
                <Link to={`/module`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleClosePenerMenu()}>
                    <Typography textAlign="center">{"Module"}</Typography>
                </Link>
            </MenuItem>
          </Menu>
          <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElProduk} anchorOrigin={{   vertical: "top",   horizontal: "right", }} keepMounted transformOrigin={{   vertical: "top",   horizontal: "right", }} open={Boolean(anchorElProduk)} onClose={()=>handleCloseProdukMenu()} >
            <MenuItem key={"kerangka"}>
                <Link to={`/kerangka`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseProdukMenu()}>
                    <Typography textAlign="center">{"Kerangka Sekolah Bebas Dadah"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"rubrik"}>
                <Link to={`/rubrik`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseProdukMenu()}>
                    <Typography textAlign="center">{"Rubrik Efikasi dan Kompetensi Guru dalam PPDa dalam Bilik Darjah"}</Typography>
                </Link>
            </MenuItem>
            <MenuItem key={"modul"}>
                <Link to={`/modul`} style={{ textDecoration: 'none', color: user?.settings?.fontColor || "primary.contrastText" }} onClick={()=>handleCloseProdukMenu()}>
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
