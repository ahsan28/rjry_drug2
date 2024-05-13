import React, { useState, useEffect } from 'react';

const ImageFetcher = ({ imageUrl }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        setImageData(base64Data);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [imageUrl]);

  return imageData;
};

export default ImageFetcher;