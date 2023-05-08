import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { EffectCoverflow, Autoplay, Pagination, Thumbs } from 'swiper';
import { Box, Divider } from '@mui/material';
import MediaService from '../../services/media.services';

const CoverflowGallery = ({ images, divider=false, thumb=true }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [loadedImages, setLoadedImages] = useState([]);
  useEffect(() => {
    console.log("images", images);
    const promises = images.map(async (image) => {
      return await MediaService.loadImage(image);
    });
    Promise.all(promises)
      .then((res) => {
        console.log("res", res);
        setLoadedImages(prev => res.map((image) => {
          return {
            src: URL.createObjectURL(image.data),
            title: image.config.url.split("/")[1]
          }
        }));
      })
      .catch((err) => {
        console.log(err);
      });

  }, [images]);

  return (<Box sx={{display: "block", textAlign: "center", width: "auto", height: "auto", margin: "auto"}}>
  <Swiper
    effect={"coverflow"}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={loadedImages.length > 3 ? 1.5: "auto"}
    coverflowEffect={{
      rotate: 50,
      stretch: 10,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={false}
    thumbs={{ swiper: thumbsSwiper }}
    modules={[EffectCoverflow, Autoplay, Pagination, Thumbs]}
    className="mySwiper"
    spaceBetween={0}
  >
    {loadedImages.map((image, index) => (
      <SwiperSlide key={index}>
        <img src={image.src} alt={image.title} style={{ objectFit: "cover", borderRadius: "10px", border: "2px solid #ccc", maxHeight: "600px", boxShadow: "0 0 10px #ccc", backgroundColor: "#fff", width: "auto", maxWidth: "100%", minHeight: "500px" }} />
        <div className="swiper-slide-caption">
          <h3>{"image.title"}</h3>
          <p>{"image.date"}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  {divider && <Divider sx={{ margin: "8px 0 1.2rem 0" }} />}
  {thumb && <Swiper
    onSwiper={setThumbsSwiper}
    slidesPerView={7}
    watchSlidesVisibility
    watchSlidesProgress
    className="mySwiper"
  >
    {loadedImages.map((image, index) => (
      <SwiperSlide key={index}>
        <img src={image.src} alt={image.title} height="80px" style={{ objectFit: "cover", borderRadius: "4px" }} />
      </SwiperSlide>
    ))}
  </Swiper>}
</Box>
);
};

export default CoverflowGallery;
