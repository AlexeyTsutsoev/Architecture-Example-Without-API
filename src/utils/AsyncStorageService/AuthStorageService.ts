import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthStorageService {
  static setAuthInStorage = async (login: string, password: string) => {
    try {
      await AsyncStorage.setItem('login', login);
      await AsyncStorage.setItem('password', password);
    } catch (err) {
      console.log('ASYNC_STORAGE_SETTOKEN_ERR', err);
    }
  };

  static setPasswordInStorage = async (password: string) => {
    try {
      await AsyncStorage.setItem('password', password);
    } catch (err: any) {
      console.log('ASYNC_STORAGE_SETPASSWORD_ERR', err);
    }
  };

  static getAuthFromStorage = async () => {
    try {
      const login = await AsyncStorage.getItem('login');
      const password = await AsyncStorage.getItem('password');
      return { login, password };
    } catch (err) {
      console.log('ASYNC_STORAGE_GETTOKEN_ERR', err);
    }
  };

  static removeAuth = async () => {
    try {
      await AsyncStorage.removeItem('login');
      await AsyncStorage.removeItem('password');
    } catch (err) {
      console.log('ASYNC_REMOVE_ERROR', err);
    }
  };
}
