import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import Image from 'mui-image';
import { UserContext } from "../../UserContext";
import './Styles/Landing.css'
import ViewImage from "./ViewImage";

const Landing = () => {
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

  return (<>
    {/* edit button */}
    {user && <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" component={Link} to={`/form/landing`}>Edit</Button>
    </Box>}
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
    <Box sx={{ width: "100%", textAlign: 'center' }}>
      <Typography variant="h1" gutterBottom>
        {data ? data.title : "Loading..."}
      </Typography>

      {/* load image */}
      {cover && <Image src={cover.path} alt={cover.name} />}

      <Typography variant="subtitle1" gutterBottom>
        {data ? data.description : "Loading..."}
      </Typography>

      {/* show an image as cover */}
      {data && data.cover && data.cover.url && (
        <>
          <img src={data.cover.url} alt={data.cover.title} class="shadow-image" />
          <Typography variant="subtitle1" gutterBottom>
            {data.cover.description}
          </Typography>
        </>
      )}
    </Box>
    </Container>
  </>);
};

export default Landing;