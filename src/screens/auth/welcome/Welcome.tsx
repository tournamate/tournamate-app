import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import TMStatusBar from '../../../components/status-bar.component';
import normalize, {
  heightPercentageToDP,
} from '../../../shared/methods/normalize';
import TMView from '../../../components/view.component';
import {LockIcon} from '../../../components/icons.component';
import ImageCarousel from '../../../components/carousels/type-1.carousel.component';
import {AuthNavProps} from '../../../navigation/navigation.types';

const Welcome = ({navigation}: AuthNavProps<'WelcomeScreen'>) => {
  const [headText, setHeadText] = useState<string>('Create your own match');
  const [subtext1, setSubtext1] = useState<string>("It's very easy to create");
  const [subText2, setSubText2] = useState('your own matches');
  const handleSettingTexts = ({
    text1,
    text2,
    text3,
  }: {
    text1: string;
    text2: string;
    text3: string;
  }) => {
    setHeadText(text1);
    setSubtext1(text2);
    setSubText2(text3);
  };
  const handleImageChange = (index: number) => {
    switch (index) {
      case 0:
        handleSettingTexts({
          text1: 'Create your own match',
          text2: "It's very easy to create",
          text3: 'your own matches',
        });
        break;
      case 1:
        handleSettingTexts({
          text1: "Don't know how to play?",
          text2: 'Still you can earn money',
          text3: 'by organizing matches',
        });
        break;
      case 2:
        handleSettingTexts({
          text1: 'Organize one-one or teams',
          text2: 'You can host wide range of matches easily.',
          text3: "organizing matches won't be a problem",
        });
        break;
      case 3:
        handleSettingTexts({
          text1: 'Exciting cash prizes',
          text2: 'Play matches and win',
          text3: 'exciting cash prizes',
        });

        break;
      default:
        break;
    }
  };
  return (
    <Layout style={[styles.container]}>
      <ScrollView>
        <TMStatusBar translucent backgroundColor="transparent" />
        <ImageCarousel
          innerContainerStyle={{
            height: heightPercentageToDP(60),
          }}
          onSnapToItem={handleImageChange}
        />
        <TMView
          justifyContent="space-between"
          alignContent="space-between"
          flex={1}
          marginBottom={30}>
          <TMView justifyContent="center" alignItems="center" marginTop={30}>
            <Text category="h4" style={styles.text1}>
              {headText}
            </Text>
            <Text category="p1">{subtext1}</Text>
            <Text category="p1">{subText2}</Text>
          </TMView>
          <TMView
            width="100%"
            paddingHorizontal={30}
            marginBottom={15}
            marginTop={normalize(60, 'height')}>
            <Button
              appearance="filled"
              size="large"
              onPress={() => navigation.navigate('SocialSignin')}
              accessoryLeft={LockIcon}>
              Login
            </Button>
          </TMView>
        </TMView>
      </ScrollView>
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
