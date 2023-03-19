import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import Image from 'mui-image';
import { UserContext } from "../../UserContext";
import ImageCoverflow from "../Hooks/CoverflowGallery";

const Activities = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);

  const images = [
    {
      src: 'https://via.placeholder.com/960x480?text=Image+1',
      title: 'Image 1',
      date: '2022-01-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+2',
      title: 'Image 2',
      date: '2022-02-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+3',
      title: 'Image 3',
      date: '2022-03-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+4',
      title: 'Image 4',
      date: '2022-04-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+5',
      title: 'Image 5',
      date: '2022-01-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+2',
      title: 'Image 2',
      date: '2022-02-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+3',
      title: 'Image 3',
      date: '2022-03-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+4',
      title: 'Image 4',
      date: '2022-04-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+1',
      title: 'Image 1',
      date: '2022-01-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+2',
      title: 'Image 2',
      date: '2022-02-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+3',
      title: 'Image 3',
      date: '2022-03-01'
    },
    {
      src: 'https://via.placeholder.com/960x480?text=Image+14',
      title: 'Image 14',
      date: '2022-04-01'
    },
  ];

  useEffect(() => {
    DataService.read("Activities")
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
      <Button variant="contained" component={Link} to={`/form/activities`}>Edit</Button>
    </Box>}
    <ImageCoverflow images={images} />
  </>);
};

export default Activities;
