import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Grid, Typography, Container,CssBaseline, Button, DialogTitle, DialogContent, Dialog, DialogActions } from '@mui/material';
import UserService from "../../services/user.services";
import { UserContext } from '../../UserContext';

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


  return (<>
    {user && <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button>
    </Box>}
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {/* different social contact links with icon  */}
          {data.linkedin && <a href={data.linkedin||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="linkedin" />
          </a>}
          {data.github && <a href={data.github||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/fluent/48/000000/github.png" alt="github" />
          </a>}
          {data.facebook && <a href={data.facebook||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="facebook" />
          </a>}
          {data.twitter && <a href={data.twitter||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="twitter" />
          </a>}
          {data.instagram && <a href={data.instagram||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="instagram" />
          </a>}
          {data.youtube && <a href={data.youtube||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="youtube" />
          </a>}
          {data.tiktok && <a href={data.tiktok||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/tiktok.png" alt="tiktok" />
          </a>}
          {data.whatsapp && <a href={data.whatsapp||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="whatsapp" />
          </a>}
          {data.skype && <a href={data.skype||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/skype--v1.png" alt="skype" />
          </a>}
          {data.googleColab && <a href={data.googleColab||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/google-colab.png" alt="googleColab" />
          </a>}
          {data.other && <a href={data.other||'#'} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/color/48/000000/plus-math.png" alt="other" />
          </a>}
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Contact Us
        </Typography>
        <Box component="form" onSubmit={sendEmail} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
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
    </Container>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Edit Links</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={updateLinks} noValidate sx={{ mt: 1 }}>
        {['linkedin','github','facebook','twitter','instagram','youtube','tiktok','whatsapp','skype','googleColab','other'].map(
          (key, index) => (
          <TextField key={index} id={index} label={key} value={data[key]||""} onChange={e => setData({ ...data, [key]: e.target.value })} />
        ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={updateLinks}>Update</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </>);
};

export default Contact;