import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export const useAuthGuard = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      } else{
        setChecking(false);
      }
      console.log('token: ', token)
    };

    checkAuth();
  }, []);

  return {checking};
};