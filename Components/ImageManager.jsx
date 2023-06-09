import React, { useState } from 'react';
import { View } from 'react-native';
import ShoeDisplay from './ShoeDisplay';
import HomeScreen from '../Pages/HomeScreen';
import AuctionScreen from '../Pages/AuctionScreen';
import AddImage from './AddImage';


const ImageManager = () => {
    const [images, setImages] = useState({
        "1685958934718.png": require('../public/images/1685958934718.png'),
        "1685958934714.jpeg": require('../public/images/1685958934714.jpeg'),
        "1685958934716.png": require('../public/images/1685958934716.png'),
    });

    const addNewImage = (imageName, imageSource) => {
        setImages(prevImages => ({
            ...prevImages,
            [imageName]: imageSource,
        }));
    };

    return (
        <View>
            Render the form to add a new image
            <AddImage addNewImage={addNewImage} />
            <ShoeDisplay images={images} />
            {Object.entries(images).map(([imageName, imageSource]) => (
                <ShoeDisplay
                    key={imageName}
                    image={imageSource}
                />
            ))}
        </View>
    );
};

export default ImageManager;
