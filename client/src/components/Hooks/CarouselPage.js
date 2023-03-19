import { Typography } from '@mui/material'
import React from 'react'
import CoverflowGallery from './CoverflowGallery'

const CarouselPage = ({data}) => {
    // data:{title, subtitle, images, paragraph, }
  return (<>
    <Typography variant="h1" component="h2" gutterBottom>
        {data.title}
    </Typography>
    <Typography variant="h2" gutterBottom>
        {data.subtitle}
    </Typography>
    <CoverflowGallery images={data.images} />
    <Typography variant="body1" gutterBottom>
        {data.paragraph}
    </Typography>
  </>)
}

export default CarouselPage