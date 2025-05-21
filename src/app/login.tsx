import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor ingresa correo y contraseña');
      return;
    }

    try {
      
      const response = await fetch('https://lecodearnback.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('response', response)
      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Error al iniciar sesión');
        return;
      }

      const data = await response.json();
      console.log('Login exitoso:', data);
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('role', data.role)

    switch (data.role){

      case 'ADMIN':
       router.push('/administrador/AdminOptions');
       break;
      case 'USER':
       router.push('/(tabs)');
       break;
      default:
       alert('Rol de usuario desconocido');
       break;
      }
      
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Svg height="200%" width="100%" style={StyleSheet.absoluteFill}>
        <Path
          d={`M 0 0 C ${width * 0.00000000001} ${height * 1}, ${width * 0.0000001} ${height * 0.1}, ${width} ${height * 0.2} L ${width} 0 Z`}
          fill="#6C63FF"
        />
        <Path
          d={`M 0 ${height * 0.85} C ${width * 0.95} ${height * 0.7}, ${width * 0.9} ${height * 0.25}, ${width * 1.5} ${height} L 0 ${height} Z`}
          fill="#A393F2"
        />
      </Svg>

      <View style={styles.loginBox}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={{ color: '#6C63FF' }} onPress={() => router.push('/register')}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#e9e8eb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 12,
    color: '#555',
  },
});
