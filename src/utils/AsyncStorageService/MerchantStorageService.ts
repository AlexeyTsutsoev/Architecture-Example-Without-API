import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MerchantStorageService {
  static setCurrentMerchantId = async (merchantId: string) => {
    try {
      await AsyncStorage.setItem('currentMerchantId', merchantId);
    } catch (err) {
      console.log('ASYNC_STORAGE_SETMERCHANT_ERR', err);
    }
  };

  static getCurrentMerchantId = async () => {
    try {
      const currentMerchantId = await AsyncStorage.getItem('currentMerchantId');
      return currentMerchantId;
    } catch (err) {
      console.log('ASYNC_STORAGE_GETMERCHANT_ERR', err);
    }
  };

  static removeMerchant = async () => {
    try {
      await AsyncStorage.removeItem('currentMerchantId');
    } catch (err) {
      console.log('ASYNC_REMOVEMERCHANT_ERROR', err);
    }
  };
}
