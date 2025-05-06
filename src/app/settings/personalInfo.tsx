import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PersonalInfoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Juan</Text>

      <Text style={styles.tittle2}>Personal Information</Text>

      <View style={[styles.infoContainer, { marginTop: 0 }]}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.infoText}>Juan</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.infoText}>juan@example.com</Text>

        <Text style={styles.label}>Pais</Text>
        <Text style={styles.infoText}>Colombia</Text>
        
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.infoText}>+57 1234567890</Text>


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
    alignSelf: 'flex-start', // Alinea el texto a la izquierda del contenedor
    textAlign: 'left',       // Alinea el contenido dentro del Text a la izquierda
  },
  tittle2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F3DFF',
    marginVertical: 30,
  },
  infoContainer: {
    width: '50%',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#5D5FEF',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D5FEF',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'left',
    lineHeight: 24,
    width: '100%',
  },
});
