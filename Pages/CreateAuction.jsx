import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CreateAuction = () => {
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [colorway, setColorway] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const createAuction = () => {
        if (
            !brand ||
            !name ||
            !model ||
            !colorway ||
            !size ||
            !price ||
            !description ||
            !date
        ) {
            console.error('Missing information');
        } else {
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('name', name);
            formData.append('model', model);
            formData.append('colorway', colorway);
            formData.append('size', size);
            formData.append('bid', price);
            formData.append('endDate', date);

            fetch('http://192.168.8.106:8080/auctions', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    alert('Auction created successfully');
                })

            // Reset form
            setBrand('');
            setName('');
            setModel('');
            setColorway('');
            setSize('');
            setPrice('');
            setDescription('');
            setDate('');
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
                placeholder="Size"
                value={size}
                onChangeText={setSize}
            />
            <TextInput
                style={styles.input}
                placeholder="Starting Price"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="End Date"
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button} onPress={createAuction}>
                <Text style={styles.buttonText}>Create auction</Text>
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

export default CreateAuction;
