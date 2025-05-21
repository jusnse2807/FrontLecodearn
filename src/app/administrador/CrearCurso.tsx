import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

export default function CrearCurso() {

  useAuthGuard();

  const [nombre, setNombre] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ nombre: '', image: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { nombre: '', image: '' };

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del curso es obligatorio';
      valid = false;
    }
    if (!image.trim()) {
      newErrors.image = 'La URL de la imagen es obligatoria';
      valid = false;
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(image)) {
      newErrors.image = 'Por favor, ingrese una URL de imagen válida';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const url = "https://lecodearnback.onrender.com/curso";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, image }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Curso creado correctamente");
        setNombre('');
        setImage('');
        setErrors({ nombre: '', image: '' });
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert("El curso no pudo ser agregado");
      }
    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
                        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>
      <ScrollView 
      
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.card}>
          <View style={styles.header}>
            <FontAwesome name="graduation-cap" size={40} color="#3b82f6" style={styles.headerIcon} />
            <Text style={styles.title}>Crear Curso</Text>
            <Text style={styles.subtitle}>Complete los datos para crear un nuevo curso</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre del Curso</Text>
              <View style={[
                styles.inputWrapper,
                errors.nombre ? styles.inputWrapperError : null,
                nombre ? styles.inputWrapperActive : null
              ]}>
                <FontAwesome name="book" size={18} color="#6366f1" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={nombre}
                  onChangeText={setNombre}
                  placeholder="Ej: Introducción a React"
                  placeholderTextColor="#94a3b8"
                  accessibilityLabel="Nombre del curso"
                />
              </View>
              {errors.nombre ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.nombre}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>URL de la Imagen Principal</Text>
              <View style={[
                styles.inputWrapper,
                errors.image ? styles.inputWrapperError : null,
                image ? styles.inputWrapperActive : null
              ]}>
                <FontAwesome name="image" size={18} color="#6366f1" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={image}
                  onChangeText={setImage}
                  placeholder="Ej: https://example.com/image.jpg"
                  placeholderTextColor="#94a3b8"
                  accessibilityLabel="URL de la imagen del curso"
                />
              </View>
              {errors.image ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.image}</Text>
                </View>
              ) : null}
            </View>

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
                isSubmitting ? styles.buttonDisabled : null,
              ]}
              disabled={isSubmitting}
              accessibilityRole="button"
              accessibilityLabel="Crear curso"
            >
              {isSubmitting ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.buttonText}>Creando...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <FontAwesome name="plus-circle" size={18} color="white" />
                  <Text style={styles.buttonText}>Crear Curso</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerIcon: {
    marginBottom: 16,
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: '80%',
  },
  formContainer: {
    padding: 24,
    paddingTop: 16,
    backgroundColor: 'white',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  inputWrapperActive: {
    borderColor: '#6366f1',
    backgroundColor: '#fff',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  inputIcon: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginLeft: 6,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#4f46e5',
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
});
