import { Box, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {  useParams, useNavigate, Link } from "react-router-dom";
import DataService from "../../services/data.services";
import Image from 'mui-image';
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const articles = [{
    title: "Article 1",
    description: "Description 1",
    link: "https://source.unsplash.com/random",
  }, {
    title: "Article 2",
    description: "Description 2",
    link: "https://source.unsplash.com/random",
  } , {
    title: "Article 3",
    description: "Description 3",
    link: "https://source.unsplash.com/random",
  }]

const books = [{
    title: "Book 1",
    description: "Description 1",
    link: "https://source.unsplash.com/random",
  }, {
    title: "Book 2",
    description: "Description 2",
    link: "https://source.unsplash.com/random",
  } , {
    title: "Book 3",
    description: "Description 3",
    link: "https://source.unsplash.com/random",
  }]

const Publications = () => {
  let { pubType } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [type, setType] = useState("Penerbitan");

  useEffect(() => {
    switch (pubType) {
      case "artikel":
        setData(articles);
        setType("Artikel");
        break;
      case "buku":
        setData(books);
        setType("Buku");
        break;
      case "akhbar":
        setData([]);
        setType("Akhbar");
        break;
      case 'module':
        setData([]);
        setType("Modul");
        break;
      default:
        setData([]);
        setType("Penerbitan");
        break;
    }
  }, [pubType]);

  // useEffect(() => {
  //   DataService.read("Publications")
  //     .then((res) => {
  //       if (res.data) {
  //         setData(res.data);
  //         if (res.data.cover) {
  //           MediaService.read(res.data.cover)
  //             .then((res) => {
  //               setCover(res.data);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         }
  //       }
  //       else setData({title: "Click edit button to entry", description: "Not in the database yet."});
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (<Container sx={{py:2}}>
    {/* edit button */}
    {user && <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" component={Link} to={`/form/publications`}>Edit</Button>
    </Box>}
    <Box sx={{ width: "100%", textAlign: 'center' }}>
      {/* List of Scientific Publications */}
      <Typography variant="h4" component="h1" gutterBottom>
        List of Scientific {type}
      </Typography>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
      {data.map((datum, index) => (<ListItem button>
          <ListItemText primary={datum.title} secondary={datum.link} />
        </ListItem>)
      )}
      </List>
    </Box>
    </Box>
  </Container>);
};

export default Publications;
