import React, { useState, createContext } from 'react';

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [images, setImages] = useState({
    "3249749e-ec89-4a1c-b260-12a0a0a048c8.jpeg": require('../public/images/3249749e-ec89-4a1c-b260-12a0a0a048c8.jpeg'),
    "95eb6a74-6cb7-42db-a703-a6ef94dee058.png": require('../public/images/95eb6a74-6cb7-42db-a703-a6ef94dee058.png'),
    "44f7a961-6bcf-4cc2-aea8-f7bf289b96f0.png": require('../public/images/44f7a961-6bcf-4cc2-aea8-f7bf289b96f0.png'),
  });

  const addNewImage = (imageName, imageSource) => {
    setImages(prevImages => ({
      ...prevImages,
      [imageName]: imageSource,
    }));
  };

  return (
    <ImageContext.Provider value={{ images, addNewImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };