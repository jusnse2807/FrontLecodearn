import React, { useEffect, useState } from 'react';
import { useAuthGuard } from '../hooks/useAuthGuard';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useLocalSearchParams, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type SeccionDetail = {
  id: string;
  numero: number;
  titulo: string;
  teoria: string;
  ejemplo: string;
  hasQuiz: boolean;
  moduloNumero?: number;
  moduloTitulo?: string;
  modulo?: {
    numero: number;
    titulo: string;
  };
};

export default function SeccionDetalle() {

  useAuthGuard();

  const { seccionId } = useLocalSearchParams<{ seccionId: string }>();
  const [seccion, setSeccion] = useState<SeccionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://lecodearnback.onrender.com/seccion/${seccionId}`)
      .then(r => r.json())
      .then((data: SeccionDetail) => setSeccion(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [seccionId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  if (!seccion) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Error cargando la sección</Text>
      </View>
    );
  }

  const {
    titulo,
    teoria,
    ejemplo,
    hasQuiz,
    moduloNumero,
    moduloTitulo,
    modulo,
  } = seccion;

  const numeroModulo = moduloNumero ?? modulo?.numero ?? '';
  const tituloModulo = moduloTitulo ?? modulo?.titulo ?? '';

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height={height * 0.25}
        style={styles.wave}
        viewBox={`0 0 ${width} ${height * 0.25}`}
      >
        <Path
          d={`M0,0 C ${width * 0.25},${height * 0.1} ${width * 0.75},${height * 0.15} ${width},0 L${width},${height * 0.25} L0,${height * 0.25} Z`}
          fill="#fff"
        />
      </Svg>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Botón con imagen para volver */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={require('@/assets/Cross.png')}
            style={styles.backImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Header de módulo */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Module</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{numeroModulo}</Text>
          </View>
          <Text style={styles.headerAccent}>{tituloModulo}</Text>
        </View>

        <Text style={styles.subTitle}>{titulo}</Text>

        {/* Teoría y ejemplo */}
        <View style={styles.mainCard}>
          <Text style={styles.cardContent}>{teoria}</Text>
          <View style={styles.exampleCard}>
            <Text style={styles.code}>{ejemplo}</Text>
          </View>
        </View>

        {hasQuiz && (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => router.push({ pathname: '/Quiz', params: { seccionId } })}
          >
            <Text style={styles.quizText}>Take Quiz</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const PADDING = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A393F2',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    bottom: -4000,
  },
  scroll: {
    paddingTop: 40,
    paddingHorizontal: PADDING,
    paddingBottom: 140,
  },
  backButton: {
    marginBottom: 20,
    width: 30,
    height: 30,
  },
  backImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  circleText: {
    color: '#A393F2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerAccent: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFE066',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  exampleCard: {
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    padding: 16,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#222',
    lineHeight: 22,
  },
  quizButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  quizText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#fff',
  },
});
