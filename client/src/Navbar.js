import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DiamondIcon from '@mui/icons-material/Diamond';
import StarIcon from '@mui/icons-material/Star';
import SquareIcon from '@mui/icons-material/Square';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import Crop75Icon from '@mui/icons-material/Crop75';
import HiveIcon from '@mui/icons-material/Hive';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import GradeIcon from '@mui/icons-material/Grade';
import GrassIcon from '@mui/icons-material/Grass';
import HubIcon from '@mui/icons-material/Hub';
import PixIcon from '@mui/icons-material/Pix';
import SpaIcon from '@mui/icons-material/Spa';
import TokenIcon from '@mui/icons-material/Token';
import PentagonIcon from '@mui/icons-material/Pentagon';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ViewImage from "./components/Hooks/ViewImage";
import { UserContext } from "./UserContext";
import MediaService from "./services/media.services";
import { Divider, ListItemIcon, Stack, Tooltip } from '@mui/material';


const Navbar = ({logout}) => {
  const { user, settings } = useContext(UserContext);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action='') => {
    setAnchorElUser(null);
    if(action === 'logout'){
        logout();
    }
  };
console.log('settings?.logo', settings);
  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='themeCBFS' >
        <Toolbar disableGutters className='themeCBFS'>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {settings?.logo && <ViewImage image={settings.logo} sx={{ maxHeight: 56, maxWidth: 120, display: { xs: "none", md: "flex" } }} />}
            {/* LOGO */}
          </Typography>

            {/* MOBILE MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ ml: -2, }}
            >
              <MenuIcon sx={{ color: settings?.sheds.headerText }} />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {settings?.logo && <ViewImage image={settings?.logo} sx={{ maxHeight: 50, maxWidth: 120, display: { xs: "flex", md: "none" } }} />}
              {/* LOGO */}
            </Typography>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user?.username === 'dev' && <MenuItem key={`script`} onClick={handleCloseNavMenu} component={Link} to="/script">
                  <ListItemIcon>
                    <DiamondIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Script</Typography>
                </MenuItem>}
                <MenuItem key={`introduction`} onClick={handleCloseNavMenu} component={Link} to="/introduction">
                  <ListItemIcon>
                    <SpaIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Pengenalan</Typography>
                </MenuItem>
                <MenuItem key={`member_profiles`} onClick={handleCloseNavMenu} component={Link} to="/member_profiles">
                  <ListItemIcon>
                    <PixIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Profil</Typography>
                </MenuItem>
                <MenuItem key={`publication`} onClick={handleCloseNavMenu} component={Link} to="/publication">
                  <ListItemIcon>
                    <HiveIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Penerbitan</Typography>
                </MenuItem>
                <MenuItem key={`activity`} onClick={handleCloseNavMenu} component={Link} to="/activity">
                  <ListItemIcon>
                    <FilterVintageIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Aktiviti</Typography>
                </MenuItem>
                <MenuItem key={`product`} onClick={handleCloseNavMenu} component={Link} to="/product">
                  <ListItemIcon>
                    <GrassIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Produk</Typography>
                </MenuItem>
                <MenuItem key={`contact`} onClick={handleCloseNavMenu} component={Link} to="/contact">
                  <ListItemIcon>
                    <LocalFloristIcon sx={{ mr: 1 }} />
                  </ListItemIcon>
                  <Typography variant="caption">Hubungi kami</Typography>
                </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {settings?.logo && <ViewImage image={settings?.logo} sx={{ maxHeight: 64, maxWidth: 120, display: { xs: "none", md: "flex" } }} />}
            {/* LOGO */}
          </Typography>


          {/* DESKTOP MENU */}
          <Box sx={{ mt:4, flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            {user?.username === 'dev' && <Button component={Link} to="/script" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <DiamondIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Script</Typography>
              </Stack>
            </Button>}
            <Button component={Link} to="/introduction" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <SpaIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Pengenalan</Typography>
              </Stack>
            </Button>
            <Button component={Link} to="/member_profiles" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <PixIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Profil</Typography>
              </Stack>
            </Button>
            <Button component={Link} to="/publication" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <HiveIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Penerbitan</Typography>
              </Stack>
            </Button>
            <Button component={Link} to="/activity" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <FilterVintageIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Aktiviti</Typography>
              </Stack>
            </Button>
            <Button component={Link} to="/product" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <GrassIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Produk</Typography>
              </Stack>
            </Button>
            <Button component={Link} to="/contact" sx={{ textAlign: 'center' }}>
              <Stack direction="column" alignItems="center" spacing={0.4}>
                <LocalFloristIcon sx={{ fontSize: 18, color: settings?.sheds.headerText }} />
                <Typography color={settings?.sheds.headerText} variant="body1">Hubungi kami</Typography>
              </Stack>
            </Button>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User Avatar" />
            </IconButton>
          </Box> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e)=>setAnchorElUser(e.currentTarget)} sx={{ p: 0, my:1, mr:-1.5 }} >
                <Avatar alt="Ra" src={profilePic} sx={{ width: 50, height: 50 }} variant={isLargeScreen ? "circular" : "rounded"} />
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