import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MediaService from "../../services/media.services";
import DataService from "../../services/data.services";

import { Carousel as Ca } from "react-carousel-minimal";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Gallery = () => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    DataService.read("Gallery")
      .then((res) => {
        if (res.data) {
          setData(res.data);
          if (res.data.gallery.length>0){
            res.data.gallery.forEach(async (mediaId,index) => {
              let {data} = await MediaService.read(mediaId);
              if (data){
                setGalleryImages(()=>[...galleryImages,{
                  image: data.path||data.url,
                  caption: data.name||"Demo caption", 
                }])
              }
            });
          }

        }
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <>
    {user && <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" component={Link} to={`/form/gallery`}>Edit</Button>
    </Box>}
      <div className="App">
        <Box sx={{ width: "100%" }}>
          <Typography variant="h1" gutterBottom>
          {data ? data.title : "Loading..."}
          </Typography>

          <div style={{ textAlign: "center" }}>
            <h2>{data ? data.title : "Loading..."}</h2>
            <p>
            {data ? data.description : "Loading..."}
            </p>
            <div
              style={{
                padding: "0 20px",
              }}
            >
              {galleryImages.length>0 && (<Ca
                data={galleryImages}
                time={4000}
                width="850px"
                height="500px"
                captionStyle={captionStyle}
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  maxWidth: "850px",
                  maxHeight: "500px",
                  margin: "40px auto",
                }}
              />)}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Gallery;
