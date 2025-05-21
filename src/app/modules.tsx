import React, { useEffect, useState } from 'react';
import { useAuthGuard } from '../hooks/useAuthGuard';
import {
  View, Text, StyleSheet, Dimensions,
  TouchableOpacity, ActivityIndicator, Image
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useLocalSearchParams, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const PuzzlePiece = ({ number }: { number: number }) => (
  <View style={styles.puzzleWrapper}>
    <Image
      source={require('../../assets/puzzle.png')}
      style={styles.puzzleImage}
      resizeMode="contain"
    />
    <View style={styles.numberCircle}>
      <Text style={styles.puzzleNumber}>{number}</Text>
    </View>
  </View>
);

export default function ModuloScreen() {

  useAuthGuard();

  const { cursoId } = useLocalSearchParams<{ cursoId: string }>();
  const [modulos, setModulos] = useState<{ id: string; numero: string; titulo: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://lecodearnback.onrender.com/modulo/curso/${cursoId}`)
      .then(r => r.json())
      .then(data => setModulos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cursoId]);

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Path
          d={`M0,0 C${width*0.00000000001},${height*0.9} ${width*0.0000001},${height*0.1} ${width},${height*0.2} L${width},0 Z`}
          fill="#6C63FF"
        />
        <Path
          d={`M0,${height*0.85} C${width*0.95},${height*0.75} ${width*0.9},${height*0.25} ${width*1.5},${height} L0,${height} Z`}
          fill="#A393F2"
        />
      </Svg>

      <Text style={styles.title}>Modules</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" />
      ) : (
        <View style={styles.modulesContainer}>
          {modulos.map((m, i) => (
            <TouchableOpacity
              key={m.id}
              onPress={() =>
                router.push({
                  pathname: '/Secciones',
                  params: { moduloId: m.id },
                })
              }
            >
              <PuzzlePiece number={i + 1} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ede7f3', alignItems: 'center', paddingTop: 80 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  modulesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  puzzleWrapper: { width: 90, height: 90, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  puzzleImage: { width: 90, height: 90 },
  numberCircle: {
    position: 'absolute', width: 36, height: 38, borderRadius: 19,
    backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center',
    top: 30, left: 25.5,
  },
  puzzleNumber: { fontSize: 18, fontWeight: 'bold', color: '#3b4cca' },
});
