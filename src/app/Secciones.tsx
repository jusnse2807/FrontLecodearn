import React, { useEffect, useState } from 'react';
import { useAuthGuard } from '../hooks/useAuthGuard';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

type Seccion = {
  id: string;
  numero: number;
  titulo: string;
};

export default function Secciones() {

  useAuthGuard();

  // Recibimos moduloId y moduloNumero desde params
  const { moduloId, moduloNumero } = useLocalSearchParams<{
    moduloId: string;
    moduloNumero: string;
  }>();
  const modNum = Number(moduloNumero);

  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://lecodearnback.onrender.com/seccion/modulo/${moduloId}`)
      .then(res => res.json())
      .then((data: Seccion[]) => setSecciones(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [moduloId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón Volver */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </Pressable>

      {/* Fondos SVG */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Path
          d={`
            M0,0
            C ${width * 0.00000000001},${height * 0.9}
              ${width * 0.0000001},${height * 0.1}
              ${width},${height * 0.2}
            L${width},0 Z
          `}
          fill="#6C63FF"
        />
        <Path
          d={`
            M0,${height * 0.85}
            C ${width * 0.95},${height * 0.75}
              ${width * 0.9},${height * 0.25}
              ${width * 1.5},${height}
            L0,${height}
            Z
          `}
          fill="#A393F2"
        />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.title}>Sections</Text>

        <FlatList
          data={secciones}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
          
            return (
              <Pressable
                style={styles.courseItem}
                onPress={() =>
                  router.push({
                    pathname: '/SeccionDetalle',
                    params: { seccionId: item.id },
                  })
                }
              >
                <Text style={styles.courseText}>
                    {item.titulo}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f3',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4169e1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
    paddingBottom: 40,
    marginTop: 40, // desplaza los botones más abajo
  },
  courseItem: {
    backgroundColor: '#cfc9ef',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: 280,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  courseText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
