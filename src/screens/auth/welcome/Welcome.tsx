import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import TMStatusBar from '../../../components/status-bar.component';
import ImageCarousel from '../../../components/image-carousel.component';
import normalize from '../../../shared/methods/normalize';
import TMView from '../../../components/view.component';
import {RouterConstants} from '../../../constants/router.constants';
import {LockIcon, PlusSquareIcon} from '../../../components/icons.component';

// TODO: define types for navigation
const Welcome = ({navigation}: any) => {
  return (
    <Layout style={[styles.container]}>
      <TMStatusBar translucent backgroundColor="transparent" />
      <ImageCarousel sliderHeight={normalize(300, 'height')} autoplay={false} />
      <TMView
        justifyContent="center"
        alignItems="center"
        marginBottom={50}
        marginTop={30}>
        <Text category="h4" style={styles.text1}>
          Create your own match
        </Text>
        <Text category="p1">It's very easy to create </Text>
        <Text category="p1">your own matches</Text>
        <TMView
          width="100%"
          paddingHorizontal={30}
          marginBottom={15}
          marginTop={normalize(60, 'height')}>
          <Button
            appearance="filled"
            size="large"
            onPress={() => navigation.navigate(RouterConstants.Signin)}
            accessoryLeft={LockIcon}>
            Login
          </Button>
        </TMView>
        <TMView width="100%" paddingHorizontal={30}>
          <Button status="basic" size="large" accessoryLeft={PlusSquareIcon}>
            Create Account
          </Button>
        </TMView>
      </TMView>
    </Layout>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {textAlign: 'center', marginBottom: 35},
});
