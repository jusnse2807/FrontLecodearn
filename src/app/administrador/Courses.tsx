import React, { ReactNode, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthGuard } from '@/src/hooks/useAuthGuard';

const { width, height } = Dimensions.get('window');

const iconMap: {[key: string]: ReactNode} = {

  python: <FontAwesome5 name="python" size={24} color="#6C63FF" />,
  java: <MaterialCommunityIcons name="language-java" size={24} color="#6C63FF" />,
  html: <MaterialCommunityIcons name="language-html5" size={24} color="#6C63FF" />,
  javascript: <MaterialCommunityIcons name="language-javascript" size={24} color="#6C63FF" />,
  csharp: <MaterialCommunityIcons name="language-csharp" size={24} color="#6C63FF" />,
};

export default function CoursesScreen() {

  useAuthGuard();

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

  const getIcon = (name: string) => {
    const key = name.toLowerCase().replace('#', 'sharp');
    return iconMap[key] || <MaterialCommunityIcons name="book-outline" size={24} color="#6C63FF" />;
  };

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
              onPress={() => router.push({ pathname: '/modules', params: { cursoId: item.id, cursoNombre: item.nombre } })}
              style={styles.courseItem}
            >
              <View style={styles.iconContainer}>{getIcon(item.nombre)}</View>
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
  container: { flex: 1, backgroundColor: '#ede7f3', alignItems: 'center', justifyContent: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 10, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 10 },
  backButtonText: { fontSize: 16, color: '#4169e1', fontWeight: '600' },
  content: { alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  courseList: { alignItems: 'center', paddingBottom: 40 },
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
  iconContainer: { marginRight: 12 },
  courseText: { color: '#333', fontSize: 18, fontWeight: 'bold' },
});
