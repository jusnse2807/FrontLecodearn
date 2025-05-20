import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const API_URL = 'https://lecodearnback.onrender.com/usuario';
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.addIcon}>+</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>Juan</Text>
          <Text style={styles.handle}>@juan</Text>
          <Text style={styles.joinDate}>Se unió en mayo de 2017</Text>
          <Text style={styles.followStats}>Siguiendo a 1 • 2 seguidores</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>EXP totales</Text>
          <Text style={styles.statValue}>3527</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>división actual</Text>
          <Text style={styles.statValue}>Oro</Text>
        </View>
      </View>

      <View style={styles.settingsButtons}>
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
      </View>
      <View style={styles.circle}>
        <Text style={styles.rachaText}>656</Text>
        <Text style={styles.iconStreak}>🔥</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3F3DFF',
    marginLeft: 10,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5D5FEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#3F3DFF',
  },
  addIcon: {
    fontSize: 30,
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
    width: '70%',
  },
  username: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  handle: {
    fontSize: 16,
    color: '#5D5FEF',
  },
  joinDate: {
    fontSize: 14,
    color: '#5D5FEF',
  },
  followStats: {
    fontSize: 14,
    color: '#3F3DFF',
  },
  statsSection: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5D5FEF',
  },
  statItem: {
    width: '45%',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#5D5FEF',
  },
  statValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
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
  rachaText: {
    fontSize: 18,
    color: '#3F3DFF',
    fontWeight: 'bold',
  },
  iconStreak: {
    fontSize: 20,
  },
  settingsButtons: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5D5FEF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#3F3DFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
