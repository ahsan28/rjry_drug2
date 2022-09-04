import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataService from "../../services/data.services";
import Image from 'mui-image';

const Publications = ({currentUser}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    DataService.read("Publications")
      .then((res) => {
if (res.data) setData(res.data);
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (<>
    {/* edit button */}
    {currentUser && <Box sx={{display: "flex", justifyContent: "flex-end", marginBottom: 2, marginTop: 2}}>
      <Button variant="contained" component={Link} to={`/form/publications`}>Edit</Button>
    </Box>}
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        {data ? data.title : "Loading..."}
      </Typography>

      {/* load image */}
      {data && data.cover && <Image src={data.cover.path} alt={data.cover.name} />}

      <Typography variant="subtitle1" gutterBottom>
        {data ? data.description : "Loading..."}
      </Typography>

      {/* show an image as cover */}
      {data && data.cover && data.cover.url && (
        <>
          <img src={data.cover.url} alt={data.cover.title} />
          <Typography variant="subtitle1" gutterBottom>
            {data.cover.description}
          </Typography>
        </>
      )}
    </Box>
  </>);
};

export default Publications;
