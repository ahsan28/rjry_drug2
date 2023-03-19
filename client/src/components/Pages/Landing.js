import { Box, Paper, Card, Grid, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import Image from 'mui-image';
import { UserContext } from "../../UserContext";
import './Styles/Landing.css'
import ViewImage from "./ViewImage";
import BasicPage from "../Hooks/BasicPage";

import { styled } from '@mui/material/styles';

const Landing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    DataService.read("Landing")
      .then((res) => {
        if (res.data) {
          setData(res.data);
          if (res.data.cover) {
            MediaService.read(res.data.cover)
              .then((res) => {
                setCover(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Tile = styled(Grid)(({ theme }) => ({
    // random color
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[8],
      cursor: 'pointer',
    },
  }));

  const tiles = [
    {
      title: 'Introduction',
      subtitle: 'Get introduced to our company',
      link: '/introduction',
      color: 'primary.main',
    },
    {
      title: 'Profile',
      subtitle: 'Learn more about our company',
      link: '/profile',
      color: 'secondary.main',
    },
    {
      title: 'Research',
      subtitle: 'See our research and development',
      link: '/research',
      color: 'info.main',
    },
    {
      title: 'Products',
      subtitle: 'Explore our range of products',
      link: '/products',
      color: 'success.main',
    },
    {
      title: 'Activities',
      subtitle: 'See our activities',
      link: '/activities',
      color: 'warning.main',
    },
    {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      link: '/contact',
      color: 'error.main',
    },
    {
      title: 'Login',
      subtitle: 'Login to your account',
      link: '/login',
      color: 'orange',
    },
    {
      title: 'Register',
      subtitle: 'Register for an account',
      link: '/register',
      color: 'purple',
    },
  ];

  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
      }}
      elevation={4}
    >


    <Box sx={{ height: '100%', width: '100%', backgroundColor: 'lightgray', borderRadius: 1 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h2" color="DarkSlateGray" mb={2}>
          Welcome to Our Website
        </Typography>
        <Typography variant="body1" color="DarkBlue" mb={4}>
          We are a company that specializes in providing high-quality products and services to our customers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum quis urna ullamcorper accumsan eu non elit.
        </Typography>
        <Grid container spacing={4}>
          {tiles.map((tile) => (
            <Grid item xs={12} sm={6} md={3} key={tile.title}>
              <Tile onClick={() => navigate(tile.link)} sx={{ backgroundColor: tile.color }}>
                <Typography variant="h5" color="secondary.contrastText" mb={1} sx={{ fontWeight: 'bold' }}>
                  {tile.title}
                </Typography>
                <Typography variant="body2" color="secondary.contrastText">
                  {tile.subtitle}
                </Typography>
              </Tile>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>

    </Paper>
  );
};

export default Landing;
