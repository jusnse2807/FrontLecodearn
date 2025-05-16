import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { router, useRouter } from 'expo-router';

interface User {
  id: string;
  nombre: string;
  email: string;
}

const API_URL = 'https://lecodearnback.onrender.com/usuario';

const UserManager: React.FC = () => {
  const router = useRouter();  
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{ nombre: string; email: string }>({
    nombre: '',
    email: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener usuarios');
        return res.json();
      })
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setFormData({ nombre: user.nombre, email: user.email });
  };

  const handleSave = () => {
    if (!editingUser) return;

    fetch(`${API_URL}/${editingUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al actualizar usuario');
        return res.json();
      })
      .then((updatedUser: User) => {
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setEditingUser(null);
        setFormData({ nombre: '', email: '' });
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteConfirmation = (id: string) => {
    setUserToDelete(id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar usuario');
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
<Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>

        <Text style={styles.title}>Gestión de Usuarios</Text>

        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>ID</Text>
            <Text style={styles.cellHeader}>Nombre</Text>
            <Text style={styles.cellHeader}>Correo</Text>
            <Text style={styles.cellHeader}>Acciones</Text>
          </View>

          {users.map((user) => (
            <View style={styles.row} key={user.id}>
              <Text style={styles.cell}>{user.id}</Text>

              {editingUser?.id === user.id ? (
                <>
                  <TextInput
                    style={styles.inputCell}
                    value={formData.nombre}
                    onChangeText={(text) => handleChange('nombre', text)}
                  />
                  <TextInput
                    style={styles.inputCell}
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                  />
                  <Pressable onPress={handleSave} style={styles.buttonSmall}>
                    <Text style={styles.textButtonSmall}>Guardar</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={styles.cell}>{user.nombre}</Text>
                  <Text style={styles.cell}>{user.email}</Text>
                  <View style={styles.actionButtons}>
                    <Pressable
                      onPress={() => handleEditClick(user)}
                      style={[styles.buttonSmall, { marginRight: 5 }]}
                    >
                      <Text style={styles.textButtonSmall}>Editar</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleDeleteConfirmation(user.id)}
                      style={[styles.buttonSmall, { backgroundColor: '#dc143c' }]}
                    >
                      <Text style={styles.textButtonSmall}>Eliminar</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          ))}
        </View>

        {/* Modal de confirmación para eliminar */}
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar este usuario?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.modalButtonCancel}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (userToDelete) {
                      handleDelete(userToDelete);
                    }
                    setIsModalVisible(false);
                  }}
                  style={styles.modalButtonDelete}
                >
                  <Text style={styles.modalButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    flex: 1,
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
    fontSize: 40,
    fontWeight: '800',
    color: '#4169e1',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4169e1',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  inputCell: {
    flex: 1,
    borderColor: '#483d8b',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  buttonSmall: {
    backgroundColor: '#4169e1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonSmall: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },

  // Estilos del Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonCancel: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonDelete: {
    backgroundColor: '#dc143c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserManager;
