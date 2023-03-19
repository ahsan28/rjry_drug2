import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { EffectCoverflow, Autoplay, Pagination, Thumbs } from 'swiper';
import { Box } from '@mui/material';


const CoverflowGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (<Box sx={{display: "block", textAlign: "center", width: "100%"}}>
    <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[EffectCoverflow, Autoplay, Pagination, Thumbs]}
        className="mySwiper"
      >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={image.title}  />
          {/* <div className="swiper-slide-caption">
            <h3>{image.title}</h3>
            <p>{image.date}</p>
          </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
    <Swiper
      onSwiper={setThumbsSwiper}
      // spaceBetween={80}
      slidesPerView={7}
      watchSlidesVisibility
      watchSlidesProgress
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={image.title} height="80px" />
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
  );
};

export default CoverflowGallery;
