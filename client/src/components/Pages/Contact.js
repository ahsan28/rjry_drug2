import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Box, Grid, Typography, Container,CssBaseline, Button } from '@mui/material';
import UserService from "../../services/user.services";

const Contact = () => {
  const [mailData, setMailData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });


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

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
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
                required
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={mailData.email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
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
  );
};

export default Contact;