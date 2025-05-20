import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { Seccion } from "@/src/types";
import { router } from "expo-router";

export default function CrearModulo() {
  const [numero, setNumero] = useState('');
  const [titulo, setTitulo] = useState('');
  const [teoria, setTeoria] = useState('');
  const [ejemplo, setEjemplo] = useState('');
  const [moduloId, setModuloId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    titulo: '',
    numero: '',
    teoria: '',
    ejemplo: '',
    cursoId: '',
    moduloId: ''
  });

  const [cursos, setCursos] = useState<any[]>([]);
  const [modulos, setModulos] = useState<any[]>([]);
  const [secciones, setSecciones] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    cursos: false,
    modulos: false,
    secciones: false
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      titulo: '',
      numero: '',
      teoria: '',
      ejemplo: '',
      cursoId: '',
      moduloId: ''
    };

    if (!titulo.trim()) {
      newErrors.titulo = 'El título es obligatorio';
      valid = false;
    }
    if (!numero.trim()) {
      newErrors.numero = 'El número de sección es obligatorio';
      valid = false;
    } else if (isNaN(Number(numero))) {
      newErrors.numero = 'Debe ser un número válido';
      valid = false;
    }
    if (!teoria.trim()) {
      newErrors.teoria = 'La teoría es obligatoria';
      valid = false;
    }
    if (!ejemplo.trim()) {
      newErrors.ejemplo = 'El ejemplo es obligatorio';
      valid = false;
    }
    if (!cursoId) {
      newErrors.cursoId = 'Debe seleccionar un curso';
      valid = false;
    }
    if (!moduloId) {
      newErrors.moduloId = 'Debe seleccionar un módulo';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(prev => ({...prev, cursos: true}));
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
        console.error('Error fetching the courses');
      } finally {
        setIsLoading(prev => ({...prev, cursos: false}));
      }
    };
    fetchEvents();
  }, []);

  const fetchModulos = async (idCurso: string) => {
    setIsLoading(prev => ({...prev, modulos: true}));
    setModulos([]);
    setModuloId('');
    setSecciones([]);
    const url = `https://lecodearnback.onrender.com/modulo/curso/${idCurso}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const formattedModules = data.map((event: any) => ({
          id: event.id,
          titulo: event.titulo,
          number: event.number
        }));
        setModulos(formattedModules);
      }
    } catch (error) {
      console.error('Error fetching the modulos');
    } finally {
      setIsLoading(prev => ({...prev, modulos: false}));
    }
  };

  const fetchSecciones = async (idModulo: string) => {
    setIsLoading(prev => ({...prev, secciones: true}));
    const url = `https://lecodearnback.onrender.com/seccion/modulo/${idModulo}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const formattedSecciones = data.map((event: any) => ({
          id: event.id,
          titulo: event.titulo,
          numero: event.numero,
          teoria: event.teoria,
          ejemplo: event.ejempplo
        }));
        setSecciones(formattedSecciones);
      }
    } catch (error) {
      console.error('Error fetching the secciones');
    } finally {
      setIsLoading(prev => ({...prev, secciones: false}));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const url = "https://lecodearnback.onrender.com/seccion";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ numero, titulo, teoria, ejemplo, moduloId })
      });

      if (response.ok) {
        response.json().then((data) => {
          alert("Sección creada correctamente");
          setTitulo('');
          setNumero('');
          setTeoria('');
          setEjemplo('');
          fetchSecciones(moduloId); // Refresh sections list
        });
      } else {
        alert("La sección no pudo ser agregada");
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSecciones = ({ item }: { item: Seccion }) => (
    <View style={styles.seccionItem}>
      <Text style={styles.seccionNumber}>{item.numero}.</Text>
      <View style={styles.seccionContent}>
        <Text style={styles.seccionTitle}>{item.titulo}</Text>
        <Text style={styles.seccionPreview} numberOfLines={1}>
          {item.teoria.substring(0, 60)}...
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
                <Pressable onPress={() => router.push('/administrador/AdminOptions')} style={styles.backButton}>
                  <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <FontAwesome name="file-text-o" size={40} color="#3b82f6" style={styles.headerIcon} />
            <Text style={styles.title}>Crear Nueva Sección</Text>
            <Text style={styles.subtitle}>Complete los datos para agregar contenido al curso</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Curso Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Curso</Text>
              <View style={[
                styles.pickerWrapper,
                errors.cursoId ? styles.inputWrapperError : null,
                cursoId ? styles.inputWrapperActive : null
              ]}>
                {isLoading.cursos ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#6366f1" />
                  </View>
                ) : (
                  <Picker
                    selectedValue={cursoId}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setCursoId(itemValue);
                      setErrors(prev => ({...prev, cursoId: ''}));
                      if (itemValue) {
                        fetchModulos(itemValue);
                      }
                    }}
                    dropdownIconColor="#6366f1"
                  >
                    <Picker.Item 
                      label="Seleccione un curso..." 
                      value="" 
                      style={styles.pickerPlaceholder}
                    />
                    {cursos.map((curso) => (
                      <Picker.Item 
                        key={curso.id} 
                        label={curso.nombre} 
                        value={curso.id} 
                      />
                    ))}
                  </Picker>
                )}
              </View>
              {errors.cursoId ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.cursoId}</Text>
                </View>
              ) : null}
            </View>

            {/* Módulo Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Módulo</Text>
              <View style={[
                styles.pickerWrapper,
                errors.moduloId ? styles.inputWrapperError : null,
                moduloId ? styles.inputWrapperActive : null
              ]}>
                {isLoading.modulos ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#6366f1" />
                    <Text style={styles.loadingText}>Cargando módulos...</Text>
                  </View>
                ) : (
                  <Picker
                    selectedValue={moduloId}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setModuloId(itemValue);
                      setErrors(prev => ({...prev, moduloId: ''}));
                      if (itemValue) {
                        fetchSecciones(itemValue);
                      }
                    }}
                    dropdownIconColor="#6366f1"
                    enabled={modulos.length > 0}
                  >
                    <Picker.Item 
                      label={modulos.length > 0 ? "Seleccione un módulo..." : "Seleccione un curso primero"} 
                      value="" 
                      style={styles.pickerPlaceholder}
                    />
                    {modulos.map((modulo) => (
                      <Picker.Item 
                        key={modulo.id} 
                        label={modulo.titulo} 
                        value={modulo.id} 
                      />
                    ))}
                  </Picker>
                )}
              </View>
              {errors.moduloId ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.moduloId}</Text>
                </View>
              ) : null}
            </View>

            {/* Secciones existentes */}
            {secciones.length > 0 && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Secciones existentes en este módulo</Text>
                <View style={styles.seccionesContainer}>
                  {isLoading.secciones ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#6366f1" />
                    </View>
                  ) : (
                    <FlatList
                      data={secciones}
                      renderItem={renderSecciones}
                      keyExtractor={(item) => item.id}
                      scrollEnabled={false}
                      ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                  )}
                </View>
              </View>
            )}

            {/* Título de la sección */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Título de la Sección</Text>
              <View style={[
                styles.inputWrapper,
                errors.titulo ? styles.inputWrapperError : null,
                titulo ? styles.inputWrapperActive : null
              ]}>
                <FontAwesome name="header" size={18} color="#6366f1" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={titulo}
                  onChangeText={(text) => {
                    setTitulo(text);
                    setErrors(prev => ({...prev, titulo: ''}));
                  }}
                  placeholder="Ej: Introducción a los componentes"
                  placeholderTextColor="#94a3b8"
                />
              </View>
              {errors.titulo ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.titulo}</Text>
                </View>
              ) : null}
            </View>

            {/* Número de la sección */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número de la Sección</Text>
              <View style={[
                styles.inputWrapper,
                errors.numero ? styles.inputWrapperError : null,
                numero ? styles.inputWrapperActive : null
              ]}>
                <FontAwesome name="hashtag" size={18} color="#6366f1" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={numero}
                  onChangeText={(text) => {
                    setNumero(text);
                    setErrors(prev => ({...prev, numero: ''}));
                  }}
                  placeholder="Ej: 1, 2, 3..."
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                />
              </View>
              {errors.numero ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.numero}</Text>
                </View>
              ) : null}
            </View>

            {/* Teoría */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contenido Teórico</Text>
              <View style={[
                styles.textAreaWrapper,
                errors.teoria ? styles.inputWrapperError : null,
                teoria ? styles.inputWrapperActive : null
              ]}>
                <TextInput
                  multiline
                  numberOfLines={6}
                  placeholder="Escriba el contenido teórico aquí..."
                  placeholderTextColor="#94a3b8"
                  style={styles.textArea}
                  textAlignVertical="top"
                  scrollEnabled
                  value={teoria}
                  onChangeText={(text) => {
                    setTeoria(text);
                    setErrors(prev => ({...prev, teoria: ''}));
                  }}
                />
              </View>
              {errors.teoria ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.teoria}</Text>
                </View>
              ) : null}
            </View>

            {/* Ejemplo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ejemplo Práctico</Text>
              <View style={[
                styles.textAreaWrapper,
                errors.ejemplo ? styles.inputWrapperError : null,
                ejemplo ? styles.inputWrapperActive : null
              ]}>
                <TextInput
                  multiline
                  numberOfLines={6}
                  placeholder="Escriba el ejemplo práctico aquí..."
                  placeholderTextColor="#94a3b8"
                  style={styles.textArea}
                  textAlignVertical="top"
                  scrollEnabled
                  value={ejemplo}
                  onChangeText={(text) => {
                    setEjemplo(text);
                    setErrors(prev => ({...prev, ejemplo: ''}));
                  }}
                />
              </View>
              {errors.ejemplo ? (
                <View style={styles.errorContainer}>
                  <FontAwesome name="exclamation-circle" size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.ejemplo}</Text>
                </View>
              ) : null}
            </View>

            {/* Botón de enviar */}
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
                isSubmitting ? styles.buttonDisabled : null,
              ]}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.buttonText}>Creando Sección...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <FontAwesome name="save" size={18} color="white" />
                  <Text style={styles.buttonText}>Guardar Sección</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* Sección de evaluación (opcional) */}
        <View style={styles.quizCard}>
          <Text style={styles.sectionTitle}>Agregar Evaluación</Text>
          <Text style={styles.sectionDescription}>
            Puedes agregar preguntas de evaluación para esta sección después de guardarla.
          </Text>
          <Pressable 
            style={styles.secondaryButton}
            disabled={!moduloId}
          >
            <FontAwesome name="question-circle" size={18} color="white" />
            <Text style={styles.secondaryButtonText}>Agregar Preguntas</Text>
          </Pressable>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 40,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerIcon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: '80%',
  },
  formContainer: {
    padding: 24,
    paddingTop: 16,
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
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#334155',
  },
  pickerPlaceholder: {
    color: '#94a3b8',
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
  textAreaWrapper: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    minHeight: 150,
  },
  textArea: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
    textAlignVertical: 'top',
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
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 10,
    color: '#64748b',
    fontSize: 14,
  },
  seccionesContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  seccionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  seccionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
    marginRight: 12,
    minWidth: 24,
  },
  seccionContent: {
    flex: 1,
  },
  seccionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  seccionPreview: {
    fontSize: 14,
    color: '#64748b',
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: '#3A0CA3',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#3A0CA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
});