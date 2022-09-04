import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MediaService from "../../services/media.services";
import DataService from "../../services/data.services";

import { Carousel as Ca } from "react-carousel-minimal";
import { Link } from "react-router-dom";

const Gallery = ({currentUser}) => {
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
              setGalleryImages(()=>[...galleryImages,{
                image: data.path||data.url,
                caption: data.name||"Demo caption", 
              }])
            });
          }

        }
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const images = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: "San Francisco",
    },
    {
      image:
        "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
      caption: "Darjeeling",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
      caption: "San Francisco",
    },
    {
      image:
        "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
      caption: "Darjeeling",
    },
    {
      image:
        "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
      caption: "San Francisco",
    },
    {
      image:
        "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
      caption: "Scotland",
    },
    {
      image:
        "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
      caption: "Darjeeling",
    },
  ];

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
    {currentUser && <Box sx={{display: "flex", justifyContent: "flex-end", marginBottom: 2, marginTop: 2}}>
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
