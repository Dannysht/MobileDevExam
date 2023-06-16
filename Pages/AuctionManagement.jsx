import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

function AuctionManagement() {

    const navigation = useNavigation();
    const handleCreateAuction = () => {
        navigation.navigate('AuctionManagement/CreateAuction');
    }


    const [auctions, setAuctions] = useState([]);
    const { user } = useContext(UserContext)


    async function updateAuction(id, status) {
        const response = await fetch(`http://192.168.68.101:8080/auctions/${id}?status=${status}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async function deleteAuction(id) {
        const response = await fetch(`http://192.168.68.101:8080/auctions/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    useEffect(() => {
        loadAuctions();
    }, []);

    async function loadAuctions() {
        if (user !== null) {
            if (user.role === 'admin') {
                const response = await fetch('http://192.168.68.101:8080/admin/auctions', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setAuctions(data);
            } else {
                const response = await fetch(`http://192.168.68.101:8080/auctions/${user.username}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setAuctions(data);
            }
        }
    }

    return (
        <>
            {user !== null && (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonCreate} onPress={handleCreateAuction}>
                        <Text style={styles.buttonText}>Create an auction</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View>
                            {auctions.map(auction => (
                                <View style={styles.auctionContainer} key={auction.auctionID} >
                                    <Text style={styles.auctionText}>ID: {auction.auctionID}</Text>
                                    <Text style={styles.auctionText}>Brand: {auction.brand}</Text>
                                    <Text style={styles.auctionText}>Name: {auction.name}</Text>
                                    <Text style={styles.auctionText}>Model: {auction.model}</Text>
                                    <Text style={styles.auctionText}>Size: {auction.size}</Text>
                                    <Text style={styles.auctionText}>Colorway: {auction.colorway}</Text>
                                    <Text style={styles.auctionText}>Current Bid: €{auction.bid}</Text>
                                    <Text style={styles.auctionText}>Description: {auction.description}</Text>
                                    <Text style={styles.auctionText}>End Date: {auction.endDate}</Text>
                                    <Text style={styles.auctionText}>
                                        Current Highest Bidder:{' '}
                                        {auction.bidUser !== null ? auction.bidUser : 'No bids have been made'}
                                    </Text>
                                    <Picker
                                        style={styles.auctionText}
                                        selectedValue={auction.status}
                                        onValueChange={(value) => {
                                            auction.status = value;
                                            setAuctions([...auctions]);
                                        }}
                                    >
                                        <Picker.Item label="Awaiting approval" value="Awaiting approval" />
                                        <Picker.Item label="Active" value="Active" />
                                        <Picker.Item label="Finished" value="Finished" />
                                    </Picker>
                                    {user.role === 'admin' && (
                                        <>
                                            <Text style={styles.auctionText}>Auctioneer: {auction.auctioneer}</Text>
                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity
                                                    style={styles.button}
                                                onPress={() => updateAuction(auction.id, auction.status)}
                                                >
                                                    <Text style={styles.buttonText}>Update Auction</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.button}
                                                onPress={() => deleteAuction(auction.id)}
                                                >
                                                    <Text style={styles.buttonText}>Delete Auction</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: '#a4c3b2',
        padding: 12,
        borderRadius: 4,
        marginBottom: 16,
        marginLeft: 10
    },
    buttonCreate: {
        backgroundColor: '#a4c3b2',
        padding: 12,
        borderRadius: 4,
        marginBottom: 16,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    auctionContainer: {
        marginBottom: 16,
        backgroundColor: '#f1f1f1',
        padding: 16,
        borderRadius: 4,
    },
    auctionText: {
        marginBottom: 8,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default AuctionManagement;
