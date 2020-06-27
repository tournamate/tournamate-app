import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';

export const setToClipboard = (value: string) => {
  Clipboard.setString(value);
  Toast.show('Copied to clipboard');
};
