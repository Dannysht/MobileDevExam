import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';

const AccountScreen = () => {
    const { user } = useContext(UserContext)
    const navigation = useNavigation();



    const handleShoesClick = () => {
        navigation.navigate('Account/Shoe');
    };

    const handleAuctionsClick = () => {
        navigation.navigate('Account/AuctionManagement');
    };

    const handleOrdersClick = () => {
        navigation.navigate('Account/Orders');
    };

    return (
        <View style={styles.container}>
            {user.role === "admin" ?
                <View>
            <TouchableOpacity style={styles.box} onPress={handleShoesClick}>
                <Image source={require('../assets/sneakers.png')} style={{ width: 100, height: 100 }} />
                <Text style={styles.text}>Shoes</Text>
            </TouchableOpacity>
                </View> : <View />
            }
            {user.role === "admin" || user.role === "auctioneer" ?
                <View>
            <TouchableOpacity style={styles.box} onPress={handleAuctionsClick}>
                <Image source={require('../assets/auctionHammer.png')} style={{ width: 100, height: 100 }} />
                <Text style={styles.text}>Auctions</Text>
                    </TouchableOpacity>
                </ View> : <View />
            }
            <TouchableOpacity style={styles.box} onPress={handleOrdersClick}>
                <Image source={require('../assets/checklist.png')} style={{ width: 100, height: 100 }} />
                <Text style={styles.text}>Orders</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    box: {
        padding: 12,
        backgroundColor: '#2f3e46',
        borderRadius: 12,
        marginBottom: 12,
    },
    text: {
        color: '#cce3de',
    },
});

export default AccountScreen;
