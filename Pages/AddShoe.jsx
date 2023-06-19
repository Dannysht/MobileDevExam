import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useImageContext } from '../Components/ImageManager';



const AddShoe = () => {
    const { addNewImage } = useImageContext();
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [colorway, setColorway] = useState('');
    const [quantity, setQuantity] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]);
    const formData = new FormData();

    const addShoe = () => {
        if (
            !brand ||
            !name ||
            !model ||
            !colorway ||
            !quantity ||
            !size ||
            !price ||
            !files
        ) {
            alert('Missing information');
        } else {
            formData.append('brand', brand);
            formData.append('name', name);
            formData.append('model', model);
            formData.append('colorway', colorway);
            formData.append('quantity', quantity);
            formData.append('size', size);
            formData.append('price', price);

            fetch("http://192.168.8.106:8080/shoes", {
                method: "POST",
                credentials: "include",
                body: formData
            });
            alert('Shoe created successfully');
            resetForm();
        }
    };


    

    const resetForm = () => {
        setBrand('');
        setName('');
        setModel('');
        setColorway('');
        setQuantity('');
        setSize('');
        setPrice('');
    };

    const pickImages = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 0.8,
              });
          if (!result.cancelled) {
            setFiles(result);
            const assets = result.assets || [result];

      const filePromises = assets.map(asset => {
        return new Promise((resolve, reject) => {
          fetch(asset.uri)
            .then(response => response.blob())
            .then(blob => resolve(blob))
            .catch(error => reject(error));
        });
      });

      Promise.all(filePromises)
        .then(blobs => {
          blobs.forEach((blob, index) => {
            const imageName = assets[index].uri.substring(200)
            addNewImage(imageName, { uri: assets[index].uri });
            // Append each blob to the formData
            formData.append('file', blob, imageName);
            console.log(formData.getAll("file"));
          });
        })
        .catch(error => console.error(error));
    }
  } catch (error) {
    console.error(error);
  }
};


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Brand"
                value={brand}
                onChangeText={setBrand}
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Model"
                value={model}
                onChangeText={setModel}
            />
            <TextInput
                style={styles.input}
                placeholder="Colorway"
                value={colorway}
                onChangeText={setColorway}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
            />
            <TextInput
                style={styles.input}
                placeholder="Size"
                value={size}
                onChangeText={setSize}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
            />
            <TouchableOpacity style={styles.button} onPress={pickImages}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addShoe}>
                <Text style={styles.buttonText}>Add Shoe</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#cce3de',
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#a4c3b2',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
});

export default AddShoe;