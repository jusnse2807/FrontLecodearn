import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CoursesScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://lecodearnback.onrender.com/curso')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading courses:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </Pressable>

      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Path
          d={`M 0 0 C ${width * 0.00000000001} ${height * 0.9}, ${width * 0.0000001} ${height * 0.1}, ${width} ${height * 0.2} L ${width} 0 Z`}
          fill="#6C63FF"
        />
        <Path
          d={`M 0 ${height * 0.85} C ${width * 0.95} ${height * 0.75}, ${width * 0.9} ${height * 0.25}, ${width * 1.5} ${height} L 0 ${height} Z`}
          fill="#A393F2"
        />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.title}>Cursos</Text>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/modules',
                  params: { cursoId: item.id, cursoNombre: item.nombre },
                })
              }
              style={styles.courseItem}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.courseIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.courseText}>{item.nombre}</Text>
            </Pressable>
          )}
          contentContainerStyle={styles.courseList}
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
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
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
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  courseList: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  courseItem: {
    backgroundColor: '#cfc9ef',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
    width: 30,
    height: 30,
  },
  courseIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  courseText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
