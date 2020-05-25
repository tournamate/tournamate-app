import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from '@ui-kitten/components';
import {ImageOverlay} from '../../../components/image-overlay.component';
import TMStatusBar from '../../../components/status-bar.component';
import {AppIcon} from '../../../constants/icons';

const Intro = (): React.ReactElement => {
  const insets = useSafeAreaInsets();
  return (
    <React.Fragment>
      <ImageOverlay
        source={require('./assets/background-image-1.png')}
        style={[styles.container, {paddingTop: insets.top}]}>
        <TMStatusBar translucent backgroundColor="transparent" />
        <View style={{marginTop: 40}}>
          <AppIcon />
          <Text style={styles.text} category="h1" status="basic">
            Tournamate
          </Text>
        </View>
        <View>
          <Text>Hello</Text>
        </View>
      </ImageOverlay>
    </React.Fragment>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
