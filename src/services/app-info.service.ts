import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export class AppInfoService {
  static getVersion = (): string => {
    return DeviceInfo.getVersion();
  };

  static getBuildNumber = (): string => {
    return DeviceInfo.getBuildNumber();
  };
  static isIOS = Platform.OS === 'ios';
}
