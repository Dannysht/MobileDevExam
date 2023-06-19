import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShoesTable = () => {
    const navigation = useNavigation();
    const [shoes, setShoes] = useState([]);

    const handleAddShoe = () => {
        navigation.navigate('Shoe/AddShoe')
    }


    useEffect(() => {
        fetchShoes();
    }, []);

    const fetchShoes = async () => {
        const response = await fetch("http://192.168.68.101:8080/shoes", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await response.json();
        setShoes(data);
    };

    const handleUpdateText = (id, field, value) => {
        const updatedShoes = shoes.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    [field]: value
                };
            }
            return item;
        });
        setShoes(updatedShoes);
    };

    const updateShoe = async (id, brand, name, model, colorway, quantity, price) => {
        await fetch(`http://192.168.68.101:8080/shoes/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                brand: brand,
                name: name,
                model: model,
                colorway: colorway,
                quantity: quantity,
                price: price,
            }),
        });
    };

    const deleteShoe = async (id) => {
        await fetch(`http://192.168.68.101:8080/shoes/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        setShoes((prevShoes) => prevShoes.filter((shoe) => shoe.id !== id));
    };


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.input}>{item.id}</Text>
                <TextInput style={styles.input} value={item.brand} onChangeText={(text) => handleUpdateText(item.id, 'brand', text)} />
                <TextInput style={styles.input} value={item.name} onChangeText={(text) => handleUpdateText(item.id, 'name', text)} />
                <TextInput style={styles.input} value={item.model} onChangeText={(text) => handleUpdateText(item.id, 'model', text)} />
                <TextInput style={styles.input} value={item.colorway} onChangeText={(text) => handleUpdateText(item.id, 'colorway', text)} />
                <TextInput style={styles.input} value={item.quantity.toString()} onChangeText={(text) => handleUpdateText(item.id, 'quantity', text)} />
                <TextInput style={styles.input} value={item.price.toString()} onChangeText={(text) => handleUpdateText(item.id, 'price', text)} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        updateShoe(
                            item.id,
                            item.brand,
                            item.name,
                            item.model,
                            item.colorway,
                            item.quantity,
                            item.price
                        )
                    }
                >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteShoe(item.id)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddShoe}>
                <Text style={styles.addButtonLabel}>Add Shoe</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.inputNames}>Id</Text>
                <Text style={styles.inputNames}>Brand</Text>
                <Text style={styles.inputNames}>Name</Text>
                <Text style={styles.inputNames}>Model</Text>
                <Text style={styles.inputNames}>Color</Text>
                <Text style={styles.inputNames}>Quantity</Text>
                <Text style={styles.inputNames}>Price</Text>
            </View>

            <FlatList
                data={shoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: -3,
        marginRight: -4,
    },
    inputNames: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: -3,
        marginRight: -4,
        borderTopWidth: 1,
        borderBottomWidth: 1

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#a4c3b2',
        padding: 12,
        borderRadius: 4,
        marginRight: 8,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#a4c3b2',
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 16,
    },
    addButtonLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ShoesTable;
