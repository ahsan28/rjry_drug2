import { Box, Button, Card, CardMedia, Container, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../UserContext";
import { Avatar, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import UserService from '../../services/user.services';
import MediaService from '../../services/media.services';
import ViewImage from '../Hooks/ViewImage';

import ProfileForm from '../Forms/ProfileForm';

const StyledPaper = styled(Paper)({
  // padding: '2rem',
//   maxWidth: '600px',
  margin: '0 auto',
});


// Define an array of items with icon and text
const items = [
    {
      icon: 'https://lh3.googleusercontent.com/Bxp8IrKWEa-5KlyJp8jSXI5TAT7l0zA2XdEvdDtkEznVzhHLv01sSY82xu5nb1pfze121U6VHxwjc8HC31847_2GUzB-LJ1G3f4kcw',
      text: 'Google Colab',
      link: 'https://colab.research.google.com/',
    },
    {
      icon: 'https://img.icons8.com/color/linkedin',
      text: 'LinkedIn',
      link: 'https://www.linkedin.com/',
    },
    {
      icon: 'https://img.icons8.com/color/facebook',
      text: 'Facebook',
      link: 'https://www.facebook.com/',
    },
    {
      icon: 'https://img.icons8.com/color/instagram-new',
      text: 'Instagram',
      link: 'https://www.instagram.com/',
    },
  ];

const Profile = () => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [ avatar, setAvatar ] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (user?.avatar) {
      MediaService.loadImage(user.avatar).then((res) => {
        setAvatar(res.data);
      });
    }
  }, [user]);


  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProfileSubmit = (newProfileData) => {
  console.log("🚀 ~ file: Profile.js:59 ~ handleProfileSubmit ~ newProfileData:", newProfileData)

    let formData = new FormData();
    formData.append('_id', user._id);

    formData.append('name', newProfileData.name);
    formData.append('surname', newProfileData.surname);
    formData.append('designation', newProfileData.designation);

    formData.append('address', newProfileData.address);
    formData.append('phone', newProfileData.phone);
    formData.append('email', newProfileData.email);
    formData.append('about', newProfileData.about);

    formData.append('avatar', newProfileData.avatar);
    
    
    UserService.updateProfile(formData, user.username)
            .then((res) => {
                setUser(res.data.user)
                console.log('okr',res.data);
                navigate(`/`)
            })
            .catch((err) => {
                console.log(err);
            });
  };


  return (<Container>
    <Box sx={{my:2}}>
    {/* edit button */}
    {user && <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleDialogOpen}>Edit</Button>
          </Box>}
      <Grid container spacing={2} alignItems="center">
        <Grid sx={{ pl: 2 }} >
          {(user?.avatar && avatar) ? 
          <Card sx={{ width: 180, height: 180 }}>
            <CardMedia component="img" height="180" image={URL.createObjectURL(avatar)} alt={user.name+" "+user.surname} />
          </Card> :
          <Avatar
            src={'https://www.w3schools.com/howto/img_avatar.png'}
            alt={user?.name||'Ahsan'}
            sx={{ width: 150, height: 150 }}
          />}
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {user?.name||'Ahsan'} {user?.surname||'Habib'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {user?.designation||'Software Developer'}
          </Typography>
          <Divider />
          <Typography variant="body1" gutterBottom>
            {user?.phone||'+601151171332'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user?.email||'ahabib.j@gmail.com'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user?.address||'123, Jalan Universiti, 50603 Kuala Lumpur, Malaysia'}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{height: '2rem'}}></Box>
        <Typography variant="h5" gutterBottom>
            Useful Links
        </Typography> 
        {/* list of links with icon on the left, and text on the right in two lines, and the link should be clickable and open in a new tab */}
        {/* item list: Google Colab, LinkedIn, Facebook, Instagram */}
        <Box sx={{ width: '100%', maxWidth: 360 }}>
            <List>
                {items.map((item) => (
                // Use ListItem component to render the icon and text
                <ListItem key={item.text} button component="a" href={item.link} target="_blank">
                    <ListItemIcon>
                        <img src={item.icon} alt={item.text} style={{width: '2.5rem'}}/>
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
                ))}
            </List>
        </Box>



        <Box sx={{height: '2rem'}}></Box>
        <Typography variant="h5" gutterBottom>
            About
        </Typography>
      <Typography variant="body2" gutterBottom>
        {user?.about||
        'Ahsan Habib is a PhD student at Universiti Malaya (UM), the oldest and highest ranking Malaysian institution of higher education. He is pursuing his research in software development and artificial intelligence, aiming to contribute to human and environmental well-being. He has a passion for learning new technologies and solving complex problems. He enjoys collaborating with other researchers and sharing his knowledge with others. He is a member of the Software Engineering Research Group (SERG) at UM. He is also a student member of the Institute of Electrical and Electronics Engineers (IEEE).'}
      </Typography>
      <Button variant="contained" color="primary" component={Link} to={`/contact`} sx={{marginTop: '2rem'}}>
        Contact Us
      </Button>
    </Box>
    { user &&
      <ProfileForm open={dialogOpen} handleClose={handleDialogClose} handleSubmit={handleProfileSubmit} initialValues={{...user, accessToken:undefined}} />
    }
  </Container>)
}

export default Profile