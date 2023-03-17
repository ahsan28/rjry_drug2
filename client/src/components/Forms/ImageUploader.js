import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Box, Typography, Avatar } from '@mui/material';
import ViewImage from '../Pages/ViewImage';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const ImageUploader = ({ oldImgId, setFile, image, setImage, name }) => {
  const classes = useStyles();

  // const [image, setImage] = useState(null);

  const oldImg = typeof oldImgId === 'string' ? oldImgId : null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log("🚀 ~ file: ImageUploader.js:21 ~ handleImageChange ~ file:", file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        console.log("🚀 ~ file: ImageUploader.js:27 ~ handleImageChange ~ reader.result:", reader.result)
      };
      reader.readAsDataURL(file);
    }
    else {
      setImage(null);
    }
  };

  return (
    <Box>
      {image ? (
        <Box display="flex" alignItems="center">
          {oldImg && <>
            <ViewImage image={oldImgId} style={{ width: 80, height: 80, borderRadius: 80 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 2, width: 40, height: 40, borderRadius: 40, bgcolor: 'grey.300' }}>
           {/* a big right arrow svg icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000" d="M9.41 7.84L13.59 12l-4.18 4.16L10.83 18l6-6-6-6-1.42 1.41z"/>
            </svg>
          </Box>
          {/* shadow effect for avatar */}
          </>}
          <Avatar className={classes.avatar} src={image} sx={{ boxShadow: 3 }} />
          <Box marginLeft={2}>
            {/* <Typography variant="subtitle1">{name}</Typography> */}
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <Button variant="contained" component="span" size='small' color='primary'>
                Change Photo
              </Button>
              <Button variant="contained" onClick={()=>setImage(null)} style={{ marginLeft: 10 }} size='small' color='error'>
                Clear Changes
              </Button>
            </label>
          </Box>
        </Box>
      ) : (
        <>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" component="span" color='secondary'>
              Upload New Photo
            </Button>
          </label>
        </>
      )}
    </Box>
  );
};

export default ImageUploader;
