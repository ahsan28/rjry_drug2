import React, { useContext } from 'react';
import { Box, Button, Typography, Paper, Card, CardMedia, CardContent, CardActions, Container } from "@mui/material";
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import Image from 'mui-image';

const BasicPage = ({ data, cover, page }) => {
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ file: BasicPage.js:11 ~ BasicPage ~ page:", page)

  return (<>
    {/* edit button  at the top right corner absolute*/}
    {/* orange box across width */}
    <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {data ? data.title : "Loading..."}
      </Typography>
    </Box>
    <Container sx={{py:2, position: "relative"}}>
      {user && <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1, m: 2 }}>
        <Button variant="contained" component={Link} to={`/form/${page}`} sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}>
          Edit</Button>
      </Box>}

      {/* load image */}
      {cover && <Paper elevation={1} sx={{ width: "100%", textAlign: 'center' }}>

      {/* <Image src={cover.path} alt={cover.name} sx={{ borderRadius: "10px !important" }} /> */}
      <Card raised
        sx={{
          // height: 380,
          margin: "0 auto",
          padding: "0em",
        }}
      >
      <CardMedia
        component="img"
        height="350"
        // image={imageNetwork}
        alt={cover.originalname}
        // title={"titleasdasdsada"}
        sx={{ padding: "0px", objectFit: "cover" }}
        image={URL.createObjectURL(cover)}
        title={cover.originalname}
      />
      {/* <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
      </Paper>}

      <Typography variant="subtitle1" gutterBottom className="themeFont" align="justify" sx={{ pt: 4 }}>
        {/* first letter very big */}
        {data && data.description && data.description[0] && <span style={{ fontSize: "3em", lineHeight: 1 }}>{data.description[0]}</span>}
        {data && data.description && data.description.slice(1)}
      </Typography>

      {/* show an image as cover */}
      {data && data.cover && data.cover.url && (
        <>
          <img src={data.cover.url} alt={data.cover.title} />
          <Typography variant="subtitle1" gutterBottom  className="themeFont">
            {data.cover.description}
          </Typography>
        </>
      )}
    </Container>
  </>)
};

export default BasicPage;
