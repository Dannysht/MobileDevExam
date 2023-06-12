import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const forgotPass = () => {
        fetch('http://192.168.68.101:8080/forgotPass', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Password sent!');
                } else if (response.status === 500) {
                    alert('Could not send email. Try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email address"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={forgotPass}>
                <Text style={styles.buttonText}>Send me my password!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Back to login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cce3de',
        borderRadius: 7,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontSize: 14,
        width: '100%',
    },
    button: {
        backgroundColor: '#a4c3b2',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    link: {
        color: '#a4c3b2',
        textDecorationLine: 'underline',
        marginTop: 16,
    },
};

export default ForgotPassword;
