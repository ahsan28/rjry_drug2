import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Container, Link, Typography } from '@mui/material';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<Container maxWidth="xl" sx={{px:3, height: '24px'}} component='footer'>
        {/* <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
        </BottomNavigation> */}
        {/* developed by and year and copyright */}
        <Typography variant="body2" color="text.secondary" align="center">
            {'Built with love by '}
            <Link color="inherit" href="https://www.linkedin.com/in/ahsan-habib-5394b972/">
                Ahsan Habib
            </Link>
            {' and his team.'}
            {' © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </Container>
  );
}