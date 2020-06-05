import React from 'react';
import {ParallaxImage, ParallaxImageProps} from 'react-native-snap-carousel';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {
  TouchableOpacity,
  View,
  Image,
  ImageRequireSource,
  ImageURISource,
  ViewProps,
  ImageStyle,
} from 'react-native';
import {CommonSizings} from '../../constants/app.constants';
import {AppInfoService} from '../../services/app-info.service';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../shared/methods/normalize';

const SliderImage = ({
  parallax,
  imageUrl,
  parallaxProps,
  innerContainerStyle,
  onPress,
  imageStyle,
}: {
  parallax?: boolean;
  imageUrl: ImageRequireSource | ImageURISource;
  parallaxProps?: ParallaxImageProps;
  innerContainerStyle?: ViewProps;
  onPress?: () => void;
  imageStyle?: ImageStyle;
}) => {
  const styles = useStyleSheet(themedStyle);
  let url = imageUrl;
  if (typeof imageUrl === 'string') {
    url = {uri: imageUrl};
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.slideInnerContainer, innerContainerStyle]}
      onPress={onPress}>
      <View style={styles.shadow} />
      <View style={[styles.imageContainer]}>
        {parallax ? (
          <ParallaxImage
            source={url}
            containerStyle={[styles.imageContainer]}
            style={[styles.image as any, imageStyle]}
            parallaxFactor={0.35}
            showSpinner={true}
            spinnerColor={styles.spinnerColor.backgroundColor}
            {...parallaxProps}
          />
        ) : (
          <Image source={url} style={[styles.image as any, imageStyle]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const themedStyle = StyleService.create({
  shadow: {
    position: 'absolute',
    top: 0,
    bottom: 18,
    backgroundColor: 'color-basic-transparent-100',
    shadowColor: 'color-basic-transparent-100',
    shadowOpacity: 0.25,
    shadowOffset: {width: 30, height: 10},
    shadowRadius: 10,
    borderRadius: CommonSizings.cardBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: AppInfoService.isIOS ? 0 : -1, // Prevent a random Android rendering issue
  },
  image: {
    resizeMode: 'cover',
  },
  slideInnerContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
  },
  spinnerColor: {
    backgroundColor: 'color-primary-500',
  },
});

export default SliderImage;
