import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../Components/UserContext';
import { ImageContext } from '../Components/ImageManager';
import { Picker } from '@react-native-picker/picker';

const Shoe = (props) => {
    const [pickedSize, setPickedSize] = useState('');
    const [photos, setPhotos] = useState([]);
    const [sizes, setSizes] = useState([{}]);
    const [shoe, setShoe] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();
    const { shoeId, model } = route.params;
    const {user} = useContext(UserContext)
    const { images } = useContext(ImageContext);
    const [image, setImage] = useState(null);
    const [secondaryImages, setSecondaryImages] = useState([]);

    const url = `${shoeId}?model=${model}`

    const fetchShoe = async () =>
    {
      // const response = await fetch(`http://192.168.68.101:8080/shoes/${url}`, {
      //   method: "GET",
      //   credentials: "include",
      // })

      const response = await fetch(`http://192.168.8.106:8080/shoes/${url}`, {
      method: "GET",
      credentials: "include",
      })
      const data = await response.json()
        setShoe(data.shoe)
        setPhotos(data.photos)
        setSizes(data.sizes)
        setIsLoading(false)
    }


    useEffect(() =>
    {
        fetchShoe()
    }, [])

  useEffect(() => {
    const matchedImages = [];
    Object.keys(images).forEach((key) => {
      for (let i = 0; i < photos.length; ++i) {
        if(i === 0)
        {
          console.log(key === photos[i].photoLocation.substring(24));
          if (key === photos[i].photoLocation.substring(24)) {
            setImage(images[key])
          }
        }
        else
        {
          if (key === photos[i].photoLocation.substring(24)) {
            matchedImages.push(images[key]);
          }
        }  
      }
    });
    
    if (matchedImages.length > 0) {
      setSecondaryImages((prevImages) => [...prevImages, ...matchedImages]);
    }
  }, [photos]);


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
                shoeID : shoeId
            }
        )
      })
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <ScrollView style={styles.container}>
        {photos.length === 0 ? (
            <Text>Loading photos...</Text>
        ) : (
            <View style={styles.imageContainer}>
              <Image
                    style={styles.mainPhoto}
                    source={image}
                    alt="main-photo"
              />
            <FlatList
        data={secondaryImages}
        horizontal
        contentContainerStyle={styles.secondaryImagesWrapper}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {
            let updatedImage = image
            const updatedImages = [...secondaryImages];
            [updatedImage, updatedImages[index]] = [updatedImages[index], image];
            setImage(updatedImage)
            setSecondaryImages(updatedImages);}}>
            <Image style={styles.secondaryPhotos} source={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
              <View style={styles.pickerContainer}>
              <Picker
                selectedValue={pickedSize}
                onValueChange={(itemValue) => setPickedSize(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select size" value={null} />
                {sizes.map((size) => (
                  <Picker.Item key={size.id} label={`EU ${size.size}`} value={size.id} />
                ))}
              </Picker>
            </View>
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
        </ScrollView>
    );
    }

    const styles = {
        container:
        {
          flex: 1,
          backgroundColor: '#f6fff8',
        },
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          mainPhoto: {
            width: 256,
            height: 256,
          },
          secondaryPhotos: {
            width: 50,
            height: 50,
          },
          infoSizeContainer: {
            justifyContent: 'center',
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center'
          },
          secondaryImagesWrapper:
          {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          },
          pickerContainer: {
            marginTop: 20,
            borderWidth: 2,
            backgroundColor: "#2f3e46",
            borderColor: "#a4c3b2",
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 25,
            color: '#cce3de',
          },
          picker: {
            height: 50,
            width: '100%',
            paddingHorizontal: 10,

          },
        };

    export default Shoe