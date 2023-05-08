import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Grid, Typography, Container,CssBaseline, Button, DialogTitle, DialogContent, Dialog, DialogActions } from '@mui/material';
import UserService from "../../services/user.services";
import { UserContext } from '../../UserContext';
import MapSection from '../Map/Map';

const location = {
  address: 'UPSI, 35900 Tanjong Malim, Perak',
  lat: 3.685905,
  lng: 101.522682,
} // our location object from earlier

const Contact = () => {
  const { user } = useContext(UserContext);
  const [mailData, setMailData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      UserService.get(user.username).then(res => {
        setData(res.data.siteLinks);
      }).catch(err => {
        console.log(err);
      });
    }
  }, []);

  const sendEmail = event => {
    event.preventDefault();
    UserService.sendEmail(mailData).then(res => {
      console.log(res);
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


  return (<Container sx={{py:2}}>
    {user && <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button>
    </Box>}
    <Container maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Contact Us
        </Typography>
        <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="name"
                label="Name"
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
                label="Your email"
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
      <MapSection location={location} zoomLevel={15} />

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
    </Container>);
};

export default Contact;