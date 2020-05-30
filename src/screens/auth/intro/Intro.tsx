import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, Button} from '@ui-kitten/components';
import {ImageOverlay} from '../../../components/image-overlay.component';
import TMStatusBar from '../../../components/status-bar.component';
import {AppIcon} from '../../../constants/icons';
import TMView from '../../../components/view.component';
import {RouterConstants} from '../../../constants/router.constants';
import normalize from '../../../shared/methods/normalize';

const Intro = ({navigation}: {navigation: any}): React.ReactElement => {
  const insets = useSafeAreaInsets();

  const handleSignin = () => {
    navigation.navigate(RouterConstants.SocialSignin);
  };
  return (
    <React.Fragment>
      <ImageOverlay
        source={require('./assets/background-image-1.png')}
        style={[styles.container, {paddingTop: insets.top}]}>
        <TMStatusBar translucent backgroundColor="transparent" />
        <TMView marginTop={30} alignItems="center">
          <AppIcon />
          <TMView marginBottom={10}>
            <Text category="h1" status="control">
              TournaMate
            </Text>
          </TMView>
          <Text category="s1" status="control">
            Start earning money by
          </Text>
          <Text category="s1" status="control">
            playing your favourite games
          </Text>
        </TMView>

        <TMView
          marginBottom={20}
          width="100%"
          paddingHorizontal={normalize(40, 'width')}>
          <TMView marginBottom={30}>
            <Button
              size="giant"
              onPress={() =>
                navigation.navigate(RouterConstants.WelcomeScreen)
              }>
              Get started
            </Button>
          </TMView>
          <Button appearance="ghost" status="basic" onPress={handleSignin}>
            Already have an account? Signin
          </Button>
        </TMView>
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
