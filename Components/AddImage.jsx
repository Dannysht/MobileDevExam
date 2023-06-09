import React from 'react';
import { Button } from 'react-native';

const AddImage = ({ addNewImage }) => {
    const handleAddImage = () => {
        addNewImage("newImage.png", require('../public/images/newImage.png'));
    };

    return (
        <Button onPress={handleAddImage} title="Add New Image" />
    );
};

export default AddImage;
