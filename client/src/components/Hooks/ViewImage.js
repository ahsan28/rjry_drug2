import React, { useEffect, useState } from "react";
import MediaService from "../../services/media.services";
import { Box, CardMedia } from "@mui/material";
import ComponentLoader from "../Pages/ComponentLoader";


const ViewImage = ({ image, ...props }) => {
  console.log("🚀 ~ file: ViewImage.js:8 ~ ViewImage ~ image:", image)
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    MediaService.loadImage(image).then((res) => {
      // this is a blob response
      const ImageUrl = URL.createObjectURL(res.data);
      setImageUrl(ImageUrl);
      
    });
  }, [image]);

  return (
    <div>
      {imageUrl? (
        <CardMedia
          component="img"
          height="100"
          image={imageUrl}
          alt="Paella dish"
          {...props}
        />
      ): <CardMedia sx={{height: 100, position:'relative'}} {...props}><ComponentLoader /></CardMedia>}

    </div>
  );
};

export default ViewImage;