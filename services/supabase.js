import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
// Adaptador de armazenamento compatível com Web e Mobile
const CustomStorage = {
 getItem: (key) => {
    if (Platform.OS === 'web') {
    if (typeof window === 'undefined') return Promise.resolve(null);
    return Promise.resolve(localStorage.getItem(key));
     }
    return AsyncStorage.getItem(key);
    },
 setItem: (key, value) => {
    if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
    }
    return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
    },
 removeItem: (key) => {
    if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
    }
    return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
    },
};
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(url, key, {
 auth: {
    storage: CustomStorage, // Utiliza o armazenamento inteligente dependendo da
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web', // Detecta sessão na URL apenas na web
 },
}); 