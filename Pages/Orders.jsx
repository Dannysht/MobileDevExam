// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { UserContext } from '../Components/UserContext';
// import { useContext } from 'react';
// import { Picker } from '@react-native-picker/picker';

// const Orders = () => {
//     const { user } = useContext(UserContext)
//     const [orders, setOrders] = useState([]);

//     const updateOrder = async (id, status) => {
//         try {
//             const response = await fetch(`http://192.168.68.101:8080/orders/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     status: status,
//                 }),
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getOrders = async () => {
//         try {
//             if (user !== null) {
//                 let url = '';
//                 if (user.role === 'admin') {
//                     url = 'http://192.168.68.101:8080/orders';
//                 } else {
//                     url = `http://192.168.68.101:8080/orders/${user.username}`;
//                 }

//                 const response = await fetch(url, {
//                     method: 'GET',
//                 });
//                 const data = await response.json();
//                 setOrders(data);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getOrders();
//     }, []);

//     return (
//         <View style={styles.container}>
//             {user !== null && (
//                 <>
//                     <View style={styles.tableHeader}>
//                         <Text style={[styles.tableHeaderText, { marginRight: 5 }]}>Order number</Text>
//                         <Text style={styles.tableHeaderText}>Brand</Text>
//                         <Text style={styles.tableHeaderText}>Name</Text>
//                         <Text style={styles.tableHeaderText}>Model</Text>
//                         <Text style={styles.tableHeaderText}>Size</Text>
//                         <Text style={styles.tableHeaderText}>Colorway</Text>
//                         <Text style={styles.tableHeaderText}>Price</Text>
//                         <Text style={styles.tableHeaderText}>Status</Text>
//                         {user.role === 'admin' && <Text style={styles.tableHeaderText}>Username</Text>}
//                     </View>

//                     <FlatList
//                         data={orders}
//                         keyExtractor={(item) => item.orderid.toString()}
//                         renderItem={({ item }) => (
//                             <View style={styles.tableRow}>
//                                 <Text style={styles.tableData}>{item.orderid}</Text>
//                                 <Text style={styles.tableData}>{item.brand}</Text>
//                                 <Text style={styles.tableData}>{item.name}</Text>
//                                 <Text style={styles.tableData}>{item.model}</Text>
//                                 <Text style={styles.tableData}>{item.size}</Text>
//                                 <Text style={styles.tableData}>{item.colorway}</Text>
//                                 <Text style={styles.tableData}>€{item.price}</Text>
//                                 <Text style={styles.tableData}>{item.status}</Text>
//                                 {user.role === 'admin' ?
//                                     <View>
//                                         <Picker
//                                             style={styles.tableData}
//                                             selectedValue={item.status}
//                                             onValueChange={(value) => {
//                                                 item.status = value;
//                                                 setOrders([...orders]);
//                                             }}
//                                         >
//                                             <Picker.Item label="Pending" value="Pending" />
//                                             <Picker.Item label="In progress" value="In progress" />
//                                             <Picker.Item label="Delivered" value="Delivered" />
//                                         </Picker>
//                                         <Text style={styles.tableData}>{item.username}</Text>
//                                         <TouchableOpacity
//                                             style={styles.updateButton}
//                                             onPress={() => updateOrder(item.orderid, item.status)}
//                                         >
//                                             <Text style={styles.updateButtonText}>Update Order</Text>
//                                         </TouchableOpacity>
//                                     </ View> : <View />
//                                 }
//                             </View>
//                         )}
//                     />
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         marginBottom: 10,
//         backgroundColor: '#f1f1f1',
//         padding: 10,
//         borderRadius: 4,
//     },
//     tableHeaderText: {
//         flex: 1,
//         fontWeight: 'bold',
//     },
//     tableRow: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     },
//     tableData: {
//         flex: 1,
//     },
//     updateButton: {
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     updateButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default Orders;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';
import { Picker } from '@react-native-picker/picker';

const Orders = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    const updateOrder = async (id, status) => {
        try {
            const response = await fetch(`http://192.168.8.106:8080/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getOrders = async () => {
        try {
            if (user !== null) {
                let url = '';
                if (user.role === 'admin') {
                    url = 'http://192.168.8.106:8080/orders';
                } else {
                    url = `http://192.168.8.106:8080/orders/${user.username}`;
                }

                const response = await fetch(url, {
                    method: 'GET',
                });
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <View style={styles.container}>
            {user !== null && (
                <>
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.orderid.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Order number:</Text>
                                    <Text>{item.orderid}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Brand:</Text>
                                    <Text>{item.brand}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Name:</Text>
                                    <Text>{item.name}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Model:</Text>
                                    <Text>{item.model}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Size:</Text>
                                    <Text>{item.size}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Colorway:</Text>
                                    <Text>{item.colorway}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Price:</Text>
                                    <Text>€{item.price}</Text>
                                </View>
                                <View style={styles.verticalInfo}>
                                    <Text style={styles.infoLabel}>Status:</Text>
                                    {user.role === 'admin' ? (
                                        <Picker
                                            style={styles.statusPicker}
                                            selectedValue={item.status}
                                            onValueChange={(value) => {
                                                item.status = value;
                                                setOrders([...orders]);
                                            }}
                                        >
                                            <Picker.Item label="Pending" value="Pending" />
                                            <Picker.Item label="In progress" value="In progress" />
                                            <Picker.Item label="Delivered" value="Delivered" />
                                        </Picker>
                                    ) : (
                                        <Text>{item.status}</Text>
                                    )}
                                </View>
                                {user.role === 'admin' && (
                                    <View style={styles.verticalInfo}>
                                        <Text style={styles.infoLabel}>Username:</Text>
                                        <Text>{item.username}</Text>
                                    </View>
                                )}
                                {user.role === 'admin' && (
                                    <TouchableOpacity
                                        style={styles.updateButton}
                                        onPress={() => updateOrder(item.orderid, item.status)}
                                    >
                                        <Text style={styles.updateButtonText}>Update Order</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 4,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
    },
    tableRow: {
        marginBottom: 10,
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 4,
    },
    verticalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    statusPicker: {
        flex: 1,
    },
    updateButton: {
        backgroundColor: '#a4c3b2',
        padding: 12,
        borderRadius: 4,
        marginTop: 10,
    },
    updateButtonText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Orders;
