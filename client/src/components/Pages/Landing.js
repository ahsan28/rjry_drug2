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
import TextCarousel from "../Hooks/TextCarousel";

import { styled } from '@mui/material/styles';

const texts = [
  "Breaking the Cycle: Preventing Drug Use in Malaysian Schools",
  "Empowering Educators: Developing a Model for Drug-Free Schools",
  "Building a Safer Future: The Drug Prevention Education Project",
  "Securing Safe Spaces: The Quest for Drug-Free Schools in Malaysia",
  "Promoting a Positive Learning Environment: Drug Prevention Education in Malaysia",
  "Creating Drug-Free Schools in Malaysia: A Research Project",
];
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
        {/* Title , centered */}
        <Typography variant="h2" color="DarkBlue" mb={2} align="center">
        Preventing Drug Use in Malaysian Schools
        </Typography>
        {/* Slogan */}
        <Typography variant="h5" align="center" color="SlateGray" mb={4}>
          {texts.length > 0 && <TextCarousel texts={texts} />}

        </Typography>
        {/* Body */}
        <Typography variant="body1" color="DarkSlateGray" mb={4}>
          {/* Begin the text with a big first letter */}
          <span style={{ fontSize: '2em', fontWeight: 'bold' }}>
            {/* {data?.description?.charAt(0)} */}
            W
            </span>
          {/* Rest of the text */}

        elcome to the exciting world of drug prevention education! We are thrilled to embark on a journey that aims to create drug-free schools in Malaysia, and we are so glad that you have joined us on this mission.

        As a member of this team, you are making a real difference in the lives of students, teachers, and communities across the country. Your contributions will help prevent drug use, reduce drug-related issues in schools, and promote healthy and safe learning environments for all.

        We recognize that implementing drug prevention education in schools can be challenging, but we also know that together, we can overcome any obstacle. Your unique skills, talents, and perspectives will play a vital role in shaping the future of drug prevention education in Malaysia.

        So let us inspire each other, motivate one another, and work together towards a common goal. Together, we can make a positive impact on the lives of countless individuals and communities. Thank you for joining us on this exciting journey, and let's get started!
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
