import AsyncStorage from '@react-native-community/async-storage';

export class AppStorage {
  static getValue = (key: string): Promise<string | null> => {
    return AsyncStorage.getItem(key).then((value) => value);
  };
  static setValue = (key: string, value: string): Promise<void> => {
    return AsyncStorage.setItem(key, value);
  };
  static clearAll = async (): Promise<void> => {
    return await AsyncStorage.clear();
  };
}
