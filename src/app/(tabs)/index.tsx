import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CoursesScreen() {
  const inProgressCourses = [
    { name: 'Python', icon: <Ionicons name="logo-python" size={24} color="black" />, module: 2, progress: 0.66 },
    { name: 'Java', icon: <MaterialCommunityIcons name="language-java" size={24} color="black" />,module: 1, stars: 3, progress: 0.5  },
  ];

  const completedCourses = [
    { name: 'C#', icon: <MaterialCommunityIcons name="language-csharp" size={24} color="black" />, stars: 5 },
    { name: 'Logic 2',icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="black" />,  stars: 3 },
    { name: 'Logic 1', icon: <MaterialCommunityIcons name="lightbulb-outline" size={24} color="black" />, stars: 4 },
  ];

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
       
        <Path
          d={`M 0 ${height * -10.85} C ${width * 0.95} ${height * -10.75}, ${width * 0.9} ${height * 0.25}, ${width * 1.5} ${height} L 0 ${height} Z`}
          fill="#A393F2"
        />
      </Svg>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.userName}>Juan</Text>

        <Text style={styles.sectionTitle}>Courses in progress</Text>
        {inProgressCourses.map((course, index) => (
          <View key={index} style={styles.progressCard}>
            <View style={styles.row}>
              <Text style={styles.courseName}>{course.name}</Text>
              {course.icon}
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${course.progress * 100}%` }]} />
            </View>
            <Text style={styles.moduleText}>module {course.module}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Courses completed</Text>
        <View style={styles.completedCourses}>
          {completedCourses.map((course, index) => (
            <View key={index} style={styles.completedCard}>
              <Text style={styles.completedName}>{course.name}</Text>
              {course.icon}
              <View style={styles.stars}>
                {[...Array(course.stars)].map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color="black" />
                ))}
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f3',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3a3a3a',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2d2d2d',
  },
  progressCard: {
    backgroundColor: '#d7d2f4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  moduleText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'right',
    color: '#555',
  },
  completedCourses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  completedCard: {
    backgroundColor: '#cfc9ef',
    borderRadius: 12,
    padding: 12,
    width: '30%',
    alignItems: 'center',
  },
  completedName: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
