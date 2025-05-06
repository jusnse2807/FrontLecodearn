import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Juan</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/settings/personalInfo')}
        >
        <Text style={styles.buttonText}>Personal information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>System characteristics</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reminder settings</Text>
      </TouchableOpacity>

      <View style={styles.circle}>
        <Text style={styles.kcal}>656</Text>
        <Text style={styles.icon}>🔥</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FF',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3F3DFF',
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#5D5FEF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  circle: {
    marginTop: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#5D5FEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kcal: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
  },
});
