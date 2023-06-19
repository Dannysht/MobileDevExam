import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShoesTable = () => {
    const navigation = useNavigation();
    const [shoes, setShoes] = useState([]);

    const handleAddShoe = () => {
        navigation.navigate('Add Shoes')
    }


    useEffect(() => {
        fetchShoes();
    }, []);

    const fetchShoes = async () => {
        const response = await fetch("http://192.168.8.106:8080/shoes", {
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
        await fetch(`http://192.168.8.106:8080/shoes/${id}`, {
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
        await fetch(`http://192.168.8.106:8080/shoes/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        setShoes((prevShoes) => prevShoes.filter((shoe) => shoe.id !== id));
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.id}</Text>
            <TextInput value={item.brand} onChangeText={(text) => handleUpdateText(item.id, 'brand', text)} />
            <TextInput value={item.name} onChangeText={(text) => handleUpdateText(item.id, 'name', text)} />
            <TextInput value={item.model} onChangeText={(text) => handleUpdateText(item.id, 'model', text)} />
            <TextInput value={item.colorway} onChangeText={(text) => handleUpdateText(item.id, 'colorway', text)} />
            <TextInput value={item.quantity} onChangeText={(text) => handleUpdateText(item.id, 'quantity', text)} />
            <TextInput value={item.price} onChangeText={(text) => handleUpdateText(item.id, 'price', text)} />
            <Button
                title="Update"
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
            />
            <Button title="Delete" onPress={() => deleteShoe(item.id)} />
        </View>
    );

    return (
        <View>
            <Button title="Add Shoe" onPress={handleAddShoe} />

            <FlatList
                data={shoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default ShoesTable;
