import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface UserInfo {
  name: string;
  email: string;
  country: string;
  phone: string;
}

const PersonalInfoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Juan',
    email: 'juan@example.com',
    country: 'Colombia',
    phone: '+57 1234567890',
  });

  const handleSave = () => {
    // Implement save logic (e.g., API call to update user info)
    setIsEditing(false);
  };

  const InfoField = ({
    label,
    value,
    field,
  }: {
    label: string;
    value: string;
    field: keyof UserInfo;
  }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) =>
            setUserInfo((prev) => ({ ...prev, [field]: text }))
          }
          accessibilityLabel={`${label} input`}
        />
      ) : (
        <Text style={styles.infoText}>{value}</Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          accessibilityHint="Returns to settings screen"
        >
          <Ionicons name="arrow-back" size={24} color="#3F3DFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Information</Text>
        <TouchableOpacity
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          accessibilityLabel={isEditing ? 'Save changes' : 'Edit information'}
        >
          <Ionicons
            name={isEditing ? 'checkmark' : 'pencil'}
            size={24}
            color="#5D5FEF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <InfoField label="Name" value={userInfo.name} field="name" />
        <InfoField label="Email" value={userInfo.email} field="email" />
        <InfoField label="Country" value={userInfo.country} field="country" />
        <InfoField label="Phone" value={userInfo.phone} field="phone" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3F3DFF',
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D5FEF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#5D5FEF',
    borderRadius: 8,
    padding: 10,
  },
});

export default PersonalInfoScreen;