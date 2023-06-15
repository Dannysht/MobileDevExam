import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';


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
                <View>
                    <Button
                        title="Create an auction"
                        onPress={handleCreateAuction}
                    />
                    <ScrollView>
                        <View>
                            {auctions.map(auction => (
                                <View key={auction.auctionID}>
                                    <Text>ID: {auction.auctionID}</Text>
                                    <Text>Brand: {auction.brand}</Text>
                                    <Text>Name: {auction.name}</Text>
                                    <Text>Model: {auction.model}</Text>
                                    <Text>Size: {auction.size}</Text>
                                    <Text>Colorway: {auction.colorway}</Text>
                                    <Text>Current Bid: €{auction.bid}</Text>
                                    <Text>Description: {auction.description}</Text>
                                    <Text>End Date: {auction.endDate}</Text>
                                    <Text>
                                        Current Highest Bidder:{' '}
                                        {auction.bidUser !== null ? auction.bidUser : 'No bids have been made'}
                                    </Text>
                                    <Text>Status: {auction.status}</Text>
                                    {user.role === 'admin' && (
                                        <>
                                            <Text>Auctioneer: {auction.auctioneer}</Text>
                                            <Button
                                                title="Update Auction"
                                                onPress={() => updateAuction(auction.id, auction.status)}
                                            />
                                            <Button
                                                title="Delete Auction"
                                                onPress={() => deleteAuction(auction.id)}
                                            />
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

export default AuctionManagement;
