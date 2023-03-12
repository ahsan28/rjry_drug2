import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaService from "../../services/media.services";
import { Box } from "@mui/system";


const ViewImage = ({ image, ...props }) => {
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
        <Box
          component="img"
          src={imageUrl}
          alt="image"
          {...props}
        />
      )}

    </div>
  );
};

export default ViewImage;
