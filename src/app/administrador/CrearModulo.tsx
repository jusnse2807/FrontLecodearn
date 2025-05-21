import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { Modulo } from "@/src/types";
import { FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

export default function CrearModulo() {

  useAuthGuard();

  const [titulo, setTitulo] = useState('');
  const [numero, setNumero] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [cursos, setCursos] = useState<any[]>([]);
  const [modulos, setModulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    setLoading(true);
    const url = "https://lecodearnback.onrender.com/curso";

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const formattedCourses = data.map((event: any) => ({
          id: event.id,
          nombre: event.nombre
        }));

        setCursos(formattedCourses);
      }
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
      alert('No se pudieron cargar los cursos. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchModulos = async (idCurso: string) => {
    if (!idCurso) return;
    
    setLoading(true);
    const url = `https://lecodearnback.onrender.com/modulo/curso/${idCurso}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const formattedModules = data.map((event: any) => ({
          id: event.id,
          titulo: event.titulo,
          numero: event.numero
        }));

        setModulos(formattedModules);
      }
    } catch (error) {
      console.error('Error al cargar los módulos:', error);
      alert('No se pudieron cargar los módulos. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!titulo.trim() || !numero.trim() || !cursoId.trim()) {
      alert("Por favor complete todos los campos antes de continuar.");
      return;
    }

    setIsSubmitting(true);
    const url = "https://lecodearnback.onrender.com/modulo";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ titulo, numero, cursoId })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Módulo creado correctamente");
        setTitulo('');
        setNumero('');
        // Refrescar la lista de módulos
        fetchModulos(cursoId);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert("El módulo no pudo ser agregado");
      }
    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderModulos = ({ item }: { item: Modulo }) => (
    <View style={styles.moduloItem}>
      <FontAwesome name="file-text-o" size={18} color="#6366f1" style={styles.moduleIcon} />
      <Text style={styles.moduloText}>
        <Text style={styles.moduloNumero}>{item.numero}.</Text> {item.titulo}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
                <Pressable onPress={() => router.push('/administrador/AdminOptions')} style={styles.backButton}>
                  <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <FontAwesome name="cubes" size={44} color="#6366f1" style={styles.headerIcon} />
          <Text style={styles.title}>Crear Módulo</Text>
          <Text style={styles.subtitle}>Añada contenido estructurado a sus cursos</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="book" size={20} color="#6366f1" />
            <Text style={styles.cardTitle}>Seleccione un curso</Text>
          </View>

          <View style={styles.pickerSection}>
            <View style={styles.pickerContainer}>
              <FontAwesome name="chevron-down" size={16} color="#64748b" style={styles.pickerIcon} />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={cursoId}
                  onValueChange={(itemValue) => {
                    setCursoId(itemValue);
                    if (itemValue) {
                      fetchModulos(itemValue);
                    } else {
                      setModulos([]);
                    }
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccione un curso..." value="" color="#94a3b8" />
                  {cursos.map((curso) => (
                    <Picker.Item key={curso.id} label={curso.nombre} value={curso.id} color="#1e293b" />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#6366f1" />
              <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
          )}

          {cursoId && !loading && (
            <View style={styles.modulosContainer}>
              <View style={styles.sectionHeader}>
                <FontAwesome name="list" size={18} color="#6366f1" />
                <Text style={styles.sectionTitle}>Módulos existentes</Text>
              </View>
              
              {modulos.length > 0 ? (
                <FlatList
                  data={modulos}
                  renderItem={renderModulos}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  style={styles.modulesList}
                />
              ) : (
                <View style={styles.emptyContainer}>
                  <FontAwesome name="info-circle" size={20} color="#94a3b8" />
                  <Text style={styles.emptyText}>No hay módulos para este curso</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="plus-circle" size={20} color="#6366f1" />
            <Text style={styles.cardTitle}>Crear nuevo módulo</Text>
          </View>
            
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título del módulo</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="header" size={18} color="#6366f1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Ej: Introducción a React Native"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número del módulo</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="sort-numeric-asc" size={18} color="#6366f1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
                placeholder="Ej: 1"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
              />
            </View>
          </View>

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
              isSubmitting ? styles.buttonDisabled : null,
              !cursoId ? styles.buttonDisabled : null,
            ]}
            disabled={isSubmitting || !cursoId}
          >
            {isSubmitting ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Creando...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <FontAwesome name="plus-circle" size={18} color="white" />
                <Text style={styles.buttonText}>Crear Módulo</Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.nextStepCard}>
          <View style={styles.nextStepHeader}>
            <FontAwesome name="arrow-circle-right" size={24} color="#6366f1" style={styles.nextStepIcon} />
            <Text style={styles.nextStepTitle}>Siguiente Paso</Text>
          </View>
          <Text style={styles.nextStepDescription}>
            Para completar el contenido del módulo, añade secciones con material educativo.
          </Text>
          <Link href="/administrador/CrearSeccion" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed ? styles.buttonPressed : null,
              ]}
            >
              <View style={styles.buttonContent}>
                <FontAwesome name="file-text" size={18} color="white" />
                <Text style={styles.secondaryButtonText}>Agregar Sección</Text>
              </View>
            </Pressable>
          </Link>
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
    flex: 1,
    padding: 20,
  },
  header: {
    marginVertical: 32,
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
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
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: '85%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  pickerSection: {
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    position: 'relative',
  },
  pickerIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  pickerWrapper: {
    flex: 1,
  },
  picker: {
    height: 54,
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 12,
    color: '#64748b',
    fontSize: 15,
    fontWeight: '500',
  },
  modulosContainer: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginLeft: 10,
  },
  modulesList: {
    maxHeight: 220,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    flexDirection: 'row',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 15,
  },
  moduloItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  moduleIcon: {
    marginRight: 12,
  },
  moduloText: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    fontWeight: '500',
  },
  moduloNumero: {
    fontWeight: '700',
    color: '#6366f1',
  },
  inputGroup: {
    marginBottom: 20,
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
  inputIcon: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
    padding: 16,
    color: '#334155',
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  nextStepCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
    borderTopWidth: 4,
    borderTopColor: '#6366f1',
  },
  nextStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextStepIcon: {
    marginRight: 12,
  },
  nextStepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  nextStepDescription: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  secondaryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 28,
    width: '100%',
    maxWidth: 280,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
});