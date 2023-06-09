import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../Components/UserContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, updateUser} = useContext(UserContext)

  const login = () => {
    // Perform login logic here
    // Replace the fetch request with your actual API call

    // Simulating a successful login response
    if (username === 'admin' && password === 'password') {
      // Redirect to a different screen based on role
      // Replace 'AdminScreen' and 'UserScreen' with your actual screen components
      if (role === 'admin') {
        navigate('AdminScreen');
      } else {
        navigate('UserScreen');
      }
    } else {
      toastr.error('Wrong credentials!', '', {
        timeOut: 1500,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-right',
      });
    }
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

        <TouchableOpacity>
          <Text style={styles.redirect}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
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
