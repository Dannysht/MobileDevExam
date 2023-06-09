import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../Components/UserContext';

const Shoe = (props) => {
    const [pickedSize, setPickedSize] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [shoe, setShoe] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();
    const { shoeId, model } = route.params;
    const {user} = useContext(UserContext)

    const url = `${shoeId}?model=${model}`

    const fetchShoe = async () =>
    {
      const response = await fetch(`http://192.168.68.101:8080/shoes/${url}`, {
        method: "GET",
        credentials: "include",
      })

      // const response = await fetch(`http://192.168.8.106:8080/shoes/${url}`, {
      // method: "GET",
      // credentials: "include",
      // })
      const data = await response.json()
      console.log(data);
        setShoe(data.shoe)
        setPhotos(data.photos)
        setSizes(data.sizes)
        setIsLoading(false);
      photos.forEach(photo => {
            photo.photoLocation = photo.photoLocation.substring(16)
        })
    }


    useEffect(() =>
    {
        fetchShoe()
    }, [])

    const orderShoe = () => {
        let username = user.username
        const response = fetch(`http://localhost:8080/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body:JSON.stringify(
            {
                username: username,
                size: pickedSize
            }
        )
      })
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <View>
        {photos.length === 0 ? (
            <Text>Loading photos...</Text>
        ) : (
            <View style={styles.imageContainer}>
            {photos.map((photo, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => {
                    [photos[0].photoLocation, photo.photoLocation] = [
                    photo.photoLocation,
                    photos[0].photoLocation,
                    ];
                    setPhotos([...photos]);
                }}
                >
                {index === 0 ? (
                    <Image
                    style={styles.mainPhoto}
                    source={{ uri: photo.photoLocation }}
                    alt="main-photo"
                    />
                ) : (
                    <Image
                    style={styles.secondaryPhotos}
                    source={{ uri: photo.photoLocation }}
                    alt="secondary-photos"
                    />
                )}
                </TouchableOpacity>
            ))}
            </View>
        )}
        
        <View style={styles.infoSizeContainer}>
            <View style={styles.infoContainer}>
            <Text style={styles.brand}>{shoe.brand}</Text>
            <Text style={styles.name}>{shoe.name}</Text>
            <Text style={styles.price}>€{shoe.price}</Text>
            </View>
            
            <View style={styles.sizesContainer}>
            {sizes.length === 0 ? (
                <Text>Loading sizes...</Text>
            ) : (
                sizes.map((size) => (
                <TouchableOpacity
                    key={size.id}
                    onPress={() => setPickedSize(size.id)}
                    style={[
                    styles.sizeButton,
                    pickedSize === size.id && styles.selectedSizeButton,
                    size.quantity === 0 && styles.unavailableSizeButton,
                    ]}
                    disabled={size.quantity === 0}
                >
                    <Text style={styles.sizeLabel}>EU {size.size}</Text>
                </TouchableOpacity>
                ))
            )}
            </View>
        </View>
        
        <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={orderShoe}>
            <Text style={styles.buttonText}>Buy</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.description}>
            <Text>Model number: {shoe.model}</Text>
            <Text>Colorway: {shoe.colorway}</Text>
        </View>
        </View>
    );
    }

    const styles = {
        imageContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          mainPhoto: {
            width: 512,
            height: 512,
          },
          secondaryPhotos: {
            width: 100,
            height: 100,
          },
          infoSizeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          infoContainer: {
            flex: 1,
            marginRight: 10,
          },
          brand: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          name: {
            fontSize: 18,
          },
          price: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          sizesContainer: {
            flex: 1,
          },
          buttonWrapper: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: -25,
            marginRight: 20,
          },
          button: {
            backgroundColor: '#cce3de',
            width: 220,
            height: 50,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonText: {
            fontSize: 16,
          },
          description: {
            position: 'absolute',
            right: 0,
            marginTop: '20%',
            marginRight: '8%',
          },
        };

    export default Shoe