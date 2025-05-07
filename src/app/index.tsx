import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      const isAuthenticated = true ; // Cambia a true si quieres ir directo a tabs
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }, 2000); // 4 segundos para la splash

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/splash-art.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Lecodearn</Text>
        <Text style={styles.subtitle}></Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
  },
});