import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {
  useStyleSheet,
  StyleService,
  Layout,
  Input,
  Button,
} from '@ui-kitten/components';
import {CaptionIcon, CloseFilledIcon} from './icons.component';
import User from '../services/user.service';
import normalize from '../shared/methods/normalize';

const UserNameField = ({
  isOpen,
  onClose,
  submitCallback,
}: {
  isOpen: boolean;
  onClose?: () => void;
  submitCallback: (username: string) => void;
}) => {
  const styles = useStyleSheet(themedStyles);
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState('');
  const handleOnSubmit = async () => {
    const isUserNameExists = await User.isUserNameExists(username);
    if (isUserNameExists) {
      setError('User name is already taken.');
    } else {
      submitCallback(username);
    }
    console.log(isUserNameExists);
  };
  return (
    <Modal transparent animationType="none" visible={isOpen}>
      <View style={styles.modalBackground}>
        <Layout style={styles.activityIndicatorWrapper} level="3">
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <CloseFilledIcon style={styles.closeIcon} fill="#8F9BB3" />
            </TouchableOpacity>
          </View>
          <Input
            label="Choose an username!"
            placeholder="User name"
            captionIcon={error ? CaptionIcon : undefined}
            caption={error}
            value={username}
            status={error ? 'danger' : ''}
            onChangeText={setUsername}
          />
          <Button onPress={handleOnSubmit}>Check / Submit</Button>
        </Layout>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  modalBackground: {
    backgroundColor: 'color-basic-transparent-500',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    height: normalize(200, 'height'),
    width: normalize(300, 'width'),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  loaderStyle: {
    backgroundColor: 'color-basic-800',
  },
  closeIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: -10,
    right: -5,
    padding: 10,
  },
  iconContainer: {
    width: '100%',
  },
});

export default UserNameField;
