import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { EffectCoverflow, Autoplay, Pagination, Thumbs, Navigation } from 'swiper';
import { Box, Divider } from '@mui/material';
import MediaService from '../../services/media.services';

const CoverflowGallery = ({ images, divider=false, thumb=true, simple=false, setCLoading }) => {
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
        setLoadedImages(() => res.map((image) => {
          return {
            src: URL.createObjectURL(image.data),
            title: image.config.url.split("/")[1]
          }
        }));
        setCLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [images]);

  return (<Box sx={{display: "block", textAlign: "center", width: "auto", height: "auto", margin: "auto"}}>
  {simple? <Swiper
            spaceBetween={30}
            centeredSlides={true}    
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, Thumbs]}
            className="mySwiperSimple"
  >
    {loadedImages.map((image, index) => (
      <SwiperSlide key={index}>
        <img src={image.src} alt={image.title}  />
      </SwiperSlide>
    ))}
  </Swiper>: 
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
        <img src={image.src} alt={image.title} style={{ objectFit: "cover", borderRadius: "10px", maxHeight: "600px", boxShadow: "0 0 10px #ccc", backgroundColor: "#fff", width: "auto", maxWidth: "100%", minHeight: "500px" }} />
        <div className="swiper-slide-caption">
          <h3>{"image.title"}</h3>
          <p>{"image.date"}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>}
  {divider && <Divider sx={{ margin: "1rem 0 14px 0" }} />}
  {thumb && <Swiper
    onSwiper={setThumbsSwiper}
    slidesPerView={7}
    watchSlidesVisibility
    watchSlidesProgress
    spaceBetween={10}
    className="mySwiperThumbs"
  >
    {loadedImages.map((image, index) => (
      <SwiperSlide key={index} onClick={() => thumbsSwiper.slideTo(index)} style={{ height: '100%' }}>
        <img src={image.src} alt={image.title}/>
      </SwiperSlide>
    ))}
  </Swiper>}
</Box>
);
};

export default CoverflowGallery;
