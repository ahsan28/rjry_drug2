import React from 'react'
import GoogleMapReact from 'google-map-react'
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'
// import PlaceIcon from '@mui/icons-material/Place';
import PushPinIcon from '@mui/icons-material/PushPin';

import './map.css'
import { Card, CardMedia } from '@mui/material';

const LocationPin = ({ text }) => (
  <div className="pin">
    <PushPinIcon className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel, mapImg }) => (
  <div className="map">
    {/* add height space  */}
    <div style={{ height: '20px', width: '100%' }} />
    <h2 className="map-h2">Lawati Kami di Kampus Kami</h2>

    {/* <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        yesIWantToUseGoogleMapApiInternals
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div> */}
    <Card raised
        sx={{
          // height: 380,
          margin: "0 auto",
          padding: "0em",
        }}
      >
      <CardMedia
        component="img"
        height="350"
        // image={imageNetwork}
        alt={mapImg.originalname}
        // title={"titleasdasdsada"}
        sx={{ padding: "0px", objectFit: "cover" }}
        image={URL.createObjectURL(mapImg)}
        title={mapImg.originalname}
      />
    </Card>
  </div>
)

export default Map