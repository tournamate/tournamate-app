import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import {useStyleSheet, StyleService} from '@ui-kitten/components';

const ScreenLoader = ({loading}: {loading: boolean}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Modal transparent animationType="none" visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            animating={loading}
            color={styles.loaderStyle.backgroundColor}
          />
        </View>
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
    backgroundColor: 'color-primary-500',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loaderStyle: {
    backgroundColor: 'color-basic-800',
  },
});

export default ScreenLoader;
