import React, { useEffect, useState } from "react";
import MediaService from "../../services/media.services";
import { Box, CardMedia } from "@mui/material";



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
      {imageUrl && (
        <CardMedia
          component="img"
          height="100"
          image={imageUrl}
          alt="Paella dish"
          {...props}
        />
      )}

    </div>
  );
};

export default ViewImage;