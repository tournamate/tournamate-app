import RNRestart from 'react-native-restart';

export class AppReloadService {
  static reload = (): void => {
    RNRestart.Restart();
  };
}
