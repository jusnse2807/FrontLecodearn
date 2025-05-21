import { View, Text, StyleSheet } from 'react-native';
import { useAuthGuard } from '@/src/hooks/useAuthGuard';

export default function HomeScreen() {

  useAuthGuard();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Lecodearn!</Text>
      <Text style={styles.subtitle}>Select a course to start learning 🎯</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4FE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
  },
});
