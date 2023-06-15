import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { ImageContext } from './ImageManager';

const ShoeDisplay = (props) => {

    const { images } = useContext(ImageContext);
    const imageName = props.image.split("/");
    const styles = StyleSheet.create({
        container: {
          height: 240,
          width: 200,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 3,
          textAlign: 'center',
          paddingRight: 0,
          borderWidth: 1,
          borderColor: '#2f3e46',
          borderRadius: 12,
          backgroundColor: '#2f3e46',
        },
        brand:
        {
            //fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            color: '#cce3de',
            marginBottom: 10,
        },
        name:
        {
            //fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            color: '#cce3de',
            marginBottom: 10,
        },
        price:
        {
           // fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            color: '#cce3de',
            fontSize: 12,
        },
        image:
        {
            
            width: 150, 
            height: 150,
            marginBottom: 10,
        }
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        let found = null
        Object.keys(images).forEach((key) =>
        {
            if(key === imageName[imageName.length - 1])
            {
                found = images[key];
            }
        })
        
        if (found) {
            setImage(found);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <Text style={styles.brand} id="brand">{props.brand}</Text>
            <Text style={styles.name} id="display-title">{props.name}</Text>
            <Text style={styles.price} id="price">€{props.price}</Text>
        </View>
    );
};

export default ShoeDisplay;

