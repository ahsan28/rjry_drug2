import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Grid, Typography, Container,CssBaseline, Button, DialogTitle, DialogContent, Dialog, DialogActions, Card, CardMedia, Divider } from '@mui/material';
import UserService from "../../services/user.services";
import MediaService from "../../services/media.services";
import { UserContext } from '../../UserContext';
import MapSection from '../Map/Map';

const location = {
  address: 'UPSI, 35900 Tanjong Malim, Perak',
  lat: 3.685905,
  lng: 101.522682,
} // our location object from earlier

const Contact = ({setShowAnimation}) => {
  const { user, setIsLoading } = useContext(UserContext);
  console.log("🚀 ~ file: Contact.js:15 ~ Contact ~ user:", user)
  const [mailData, setMailData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [mapImg, setMapImg] = useState(null);

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // setShowAnimation(true)
    setIsLoading(true)
    if (user) {
      UserService.get(user._id).then(res => {
        setData(res.data.siteLinks);
      }).catch(err => {
        console.log(err);
      });
    }
    // mapimagid: 647f5282b7307719dc09f11d
    MediaService.loadImage('647f5282b7307719dc09f11d').then(res => {
      setMapImg(res.data);
      setIsLoading(false)
    }).catch(err => console.log(err));

  }, []);

  const sendEmail = event => {
    setIsLoading(true)
    event.preventDefault();
    UserService.sendEmail(mailData).then(res => {
      console.log(res);
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
    }); 
  };

  const onInputChange = event => {
    const { name, value } = event.target;

    setMailData({
      ...mailData,
      [name]: value
    });
  };

  const updateLinks = () => {
    UserService.updateLinks(data, user.username).then(res => {
      console.log(res);
      setOpen(false);
    }).catch(err => {
      console.log(err);
    });
  };


  return (<>
  <Box className="themeCBF" sx={{ height: '72px' }} />
<Box className="stripTheme" sx={{ width: "100%", textAlign: 'center', p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeTitle" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Hubungi Kami"}
      </Typography>
    </Box>
    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3}}>
    {user && <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1, m: 2 }}>
        <Button variant="contained" sx={{ width: "5rem", transform: "translateX(5rem)" }} onClick={() => setOpen(true)}>
          Edit</Button>
      </Box>}
    <Container maxWidth="sm">
      <CssBaseline />
      {mapImg && <MapSection location={location} zoomLevel={15} mapImg={mapImg} />}
      <Divider sx={{mt:5, mb:3}} />
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
        Hubungi Kami
        </Typography>
        <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="name"
                label="Your name"
                name="name"
                autoComplete="name"
                value={mailData.name}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="email"
                label="Your email (to contact you back)"
                name="email"
                autoComplete="email"
                value={mailData.email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                name="subject"
                label="Subject"
                id="subject"
                autoComplete="subject"
                value={mailData.subject}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="message"
                label="Message"
                id="message"
                autoComplete="message"
                value={mailData.message}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.5652344783493!2d101.5226819647588!3d3.685905047318148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cb890d916b37d9%3A0xfb56492063e6a825!2sUniversiti%20Pendidikan%20Sultan%20Idris!5e0!3m2!1sen!2smy!4v1680245184289!5m2!1sen!2smy" width="auto" height="400" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
      

    </Container>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Edit Links</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={updateLinks} noValidate sx={{ mt: 1 }}>
        {['linkedin','github','facebook','twitter','instagram','youtube','tiktok','whatsapp','skype','googleColab','other'].map(
          (key, index) => (
          <TextField key={index} id={index} label={key} value={data?.[key]||""} onChange={e => setData({ ...data, [key]: e.target.value })} />
        ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={updateLinks}>Update</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </Container>
  </>
  );
};

export default Contact;