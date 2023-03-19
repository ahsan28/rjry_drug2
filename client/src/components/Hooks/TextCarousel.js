import React, { useState, useEffect } from 'react';


function TextCarousel({texts}) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((textIndex + 1) % texts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [textIndex]);


  return (<>
      {texts[textIndex]}
  </>
  );
}

export default TextCarousel;
