import React, { useState, createContext, useContext } from 'react';

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [images, setImages] = useState({
    "b3f77c87-b332-4b06-87cb-876b059d04ef.jpeg.jpeg": require("../public/images/b3f77c87-b332-4b06-87cb-876b059d04ef.jpeg.jpeg"),
    "098cf8f3-bbec-4215-afb0-b22e2be43acc.jpeg.jpeg": require("../public/images/098cf8f3-bbec-4215-afb0-b22e2be43acc.jpeg.jpeg"),
    "e557639c-ff31-48ba-87bf-d219dd02da7a.jpeg.jpeg": require("../public/images/e557639c-ff31-48ba-87bf-d219dd02da7a.jpeg.jpeg"),
    "d85f3fac-88cf-4d57-b894-a17f0df70acd.jpg.jpeg" : require("../public/images/d85f3fac-88cf-4d57-b894-a17f0df70acd.jpg.jpeg"),
    "c0b46ad4-eb78-4caf-be93-92e3fe09efc2.jpg.jpeg": require("../public/images/c0b46ad4-eb78-4caf-be93-92e3fe09efc2.jpg.jpeg"),
    "b65a59d4-3d0d-4cb5-b459-6047b3ea4dcf.jpeg.jpeg": require("../public/images/b65a59d4-3d0d-4cb5-b459-6047b3ea4dcf.jpeg.jpeg"),
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
const useImageContext = () => useContext(ImageContext) 

export { ImageContext, ImageProvider, useImageContext };