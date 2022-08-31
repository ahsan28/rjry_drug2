import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataService from "../../services/data.services";

const Activities = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    DataService.read("Activities")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        {data ? data.title : "Loading..."}
      </Typography>

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
  );
};

export default Activities;
