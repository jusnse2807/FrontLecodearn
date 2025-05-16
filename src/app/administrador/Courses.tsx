import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const courses = [
  { name: 'Python', modules: 4, icon: <FontAwesome5 name="python" size={24} color="#6C63FF" /> },
  { name: 'Java', modules: 5, icon: <MaterialCommunityIcons name="language-java" size={24} color="#6C63FF" /> },
  { name: 'HTML', modules: 5, icon: <MaterialCommunityIcons name="language-html5" size={24} color="#6C63FF" /> },
  { name: 'Javascript', modules: 5, icon: <MaterialCommunityIcons name="language-javascript" size={24} color="#6C63FF" /> },
  { name: 'C#', modules: 4, icon: <MaterialCommunityIcons name="language-csharp" size={24} color="#6C63FF" /> },
];

export default function CoursesScreen() {
  return (
    <View style={styles.container}>
<Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Volver</Text>
              </Pressable>
      {/* Fondo SVG */}
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
        <Text style={styles.title}>Courses</Text>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text style={styles.courseText}>{item.name} ({item.modules} modules)</Text>
            </View>
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
  },
  courseText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
