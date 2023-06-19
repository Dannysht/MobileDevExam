import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContactUs = () => {
   const navigation = useNavigation();
   const [from, setFrom] = useState('');
   const [subject, setSubject] = useState('');
   const [text, setText] = useState('');

   const sendEmail = () => {
      fetch('http://192.168.8.106:8080/contact', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            from: from,
            subject: subject,
            text: text,
         }),
      })
         .then(response => {
            if (response.status === 200) {
               navigation.goBack();
            }
         })
         .catch(error => {
            console.error(error);
         });


   };

   return (
      <View style={styles.container}>
         <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={value => setFrom(value)}
            value={from}
         />
         <TextInput
            style={styles.input}
            placeholder="Subject"
            onChangeText={value => setSubject(value)}
            value={subject}
         />
         <TextInput
            style={styles.input}
            placeholder="Text"
            multiline={true}
            onChangeText={value => setText(value)}
            value={text}
         />

         <TouchableOpacity onPress={sendEmail} style={styles.button}>
            <Text>Send</Text>
         </TouchableOpacity>

    </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
   },
   input: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.7)',
      width: '100%',
      paddingTop: 8,
      paddingBottom: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
   },
   button: {
      backgroundColor: '#cce3de',
      width: 220,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default ContactUs