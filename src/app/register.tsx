import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [pais, setPais] = useState('');
  const [nivel_educacion, setNivelEducacion] = useState('');

  const validarFecha = (fecha: string) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);
  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!email || !password || !nombre || !fecha_nacimiento || !pais || !nivel_educacion) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validarFecha(fecha_nacimiento)) {
      alert('Formato de fecha inválido. Usa YYYY-MM-DD.');
      return;
    }

    try {
      const response = await fetch('https://lecodearnback.onrender.com/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          fecha_nacimiento,
          pais,
          nivel_educacion,
          vidas: 3,
          premium: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message?.toLowerCase().includes('ya existe')) {
          alert('Ya existe una cuenta con este correo.');
        } else {
          alert(data.message || 'Error al registrar. Verifica los datos.');
        }
        return;
      }

      // Redirige sin mostrar mensaje
      router.push('/login');

    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar al servidor.');
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

      <View style={styles.formBox}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          placeholder="Birthdate (YYYY-MM-DD)"
          style={styles.input}
          value={fecha_nacimiento}
          onChangeText={setFechaNacimiento}
        />
        <TextInput
          placeholder="Country"
          style={styles.input}
          value={pais}
          onChangeText={setPais}
        />
        <TextInput
          placeholder="Education Level"
          style={styles.input}
          value={nivel_educacion}
          onChangeText={setNivelEducacion}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={{ color: '#6C63FF' }} onPress={() => router.push('/login')}>
            Login
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
  formBox: {
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
  loginText: {
    fontSize: 12,
    color: '#555',
  },
});
