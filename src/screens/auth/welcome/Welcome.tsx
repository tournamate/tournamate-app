import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Layout, Text, Button} from '@ui-kitten/components';
import TMStatusBar from '../../../components/status-bar.component';
import ImageCarousel from '../../../components/image-carousel.component';
import normalize from '../../../shared/methods/normalize';
import TMView from '../../../components/view.component';
import {RouterConstants} from '../../../constants/router.constants';

const Welcome = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <Layout style={[styles.container, {paddingTop: insets.top}]}>
      <TMStatusBar translucent backgroundColor="transparent" />
      <ImageCarousel sliderHeight={normalize(300, 'height')} autoplay={false} />
      <TMView
        justifyContent="center"
        alignItems="center"
        marginBottom={50}
        marginTop={30}>
        <TMView marginBottom={20}>
          <Text category="h2">Create your own match</Text>
        </TMView>
        <Text category="p1">It's very easy to create </Text>
        <Text category="p1">your own matches</Text>
        <TMView
          width="100%"
          paddingHorizontal={30}
          marginBottom={15}
          marginTop={50}>
          <Button
            appearance="filled"
            size="large"
            onPress={() => navigation.navigate(RouterConstants.Signin)}>
            Login
          </Button>
        </TMView>
        <TMView width="100%" paddingHorizontal={30}>
          <Button status="basic" size="large">
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
});
