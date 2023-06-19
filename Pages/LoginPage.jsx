import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../Components/UserContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const navigate = useNavigation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, updateUser} = useContext(UserContext)
  

  const login = () => {
    
    const userData = 
    {
      username: username,
      password: password
    }

    fetch('http://192.168.8.106:8080/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Handle the error case based on the status code
      if (response.status === 400) {
        // Handle 400 Bad Request error
        console.error('Bad Request');
      } else {
        // Handle other error cases
        console.error('Request failed with status ' + response.status);
      }
      // Throw an error to trigger the .catch() block
      throw new Error('Request failed');
    }
  })
  .then(data => {
    updateUser({...userData, role: data.role});
    /*if (data !== null) {
      navigate.navigate('Home');
    }*/
  })
  .catch(error => {
    // Handle the error here
    console.error(error);
  });
  
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#a4c3b2"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a4c3b2"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.submitButton} onPress={login}>
          <Text style={styles.submitButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.redirect}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}> 
          <Text style={styles.redirect}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6fff8'
  },
  form: {
    backgroundColor: 'white',
    minWidth: 320,
    minHeight: 40,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 8,
  },
  redirect:
  {
    marginTop: 10,
    color:"#a4c3b2",
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: '#cce3de',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#a4c3b2',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
